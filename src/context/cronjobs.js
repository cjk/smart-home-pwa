// @flow

import type { CronJob, Task } from '../types'

import shortid from 'shortid'
import * as R from 'ramda'

const jobTemplate: CronJob = {
  jobId: 'cronjobs/',
  name: 'temporary scene cron-job ',
  at: '13:15:00',
  repeat: 'oneShot',
  scheduled: false,
  running: false,
  lastRun: null,
  tasks: null,
}

const buildCronjobWithTasks = (name: string, tasksAry: Array<Task>) => {
  const jobIdLens = R.lens(R.prop('jobId'), R.assoc('jobId'))
  const orgJobId = R.view(jobIdLens)(jobTemplate)

  // Remove slash in scene-name and append unique id
  const newJobId = R.set(jobIdLens, `${orgJobId}${R.replace(/\//, '', name)}-${shortid.generate()}`)

  const tasks = R.reduce((acc, task) => ({ [task.target]: task, ...acc }), {}, tasksAry)

  return R.pipe(
    newJobId,
    R.assoc('tasks', tasks)
  )(jobTemplate)
}

function scheduleJobForNow(job: CronJob) {
  return R.assoc('at', 'now', job)
}

function invertTaskActions(tasks: Array<Task>) {
  const invert = act => {
    switch (act) {
      case 'on':
        return 'off'
      case 'off':
        return 'on'
      default:
        return act
    }
  }
  return R.map(t => R.assoc('act', invert(R.prop('act', t)), t), tasks)
}

function createCronjobFromScene(name: string, tasks: Array<Task>, activate: boolean) {
  return scheduleJobForNow(buildCronjobWithTasks(name, activate ? tasks : invertTaskActions(tasks)))
}

export { createCronjobFromScene, scheduleJobForNow, invertTaskActions }
