// @flow

import Gun from 'gun'
import * as R from 'ramda'
import { Observable, empty, fromEventPattern, zip } from 'rxjs'
import { auditTime, map, scan, tap } from 'rxjs/operators'
import { createValueStreamFromPath } from '../lib/utils'

import { logger } from '../lib/debug'

const log = logger('networkPeer')

const peer = Gun('http://localhost:8765/gun')

const addrLst = peer.get('knxAddrList')

const knxLiveAddr$ = Observable.create(observer => {
  addrLst.map().on(addr => {
    observer.next(R.dissoc('_', addr))
    // Never completes
    // observer.complete()
  })
  return () => addrLst.map().off()
})

const sendUpdateGroupAddrReq = (addrId, newValue) => {
  peer
    .get('knxRequests')
    .get(addrId)
    .put({ action: 'write', value: newValue })
}

// Retrieves all scenes first and then also all tasks of a scene in an async fashion.
// It's observer will emit a new scene + tasks whenever a new task arrives over the network and never ends.
const scenes$ = Observable.create(observer => {
  const sceneLst = peer.get('scenes')
  sceneLst.map().once(scene => {
    const tasksHndlr = hndl =>
      sceneLst
        .get(scene.id)
        .get('tasks')
        .map()
        .once(hndl)
    fromEventPattern(tasksHndlr)
      .pipe(
        // tap(t => log.debug(`Raw task: ${JSON.stringify(t)}`)),
        map(t => R.dissoc('_', R.head(t))),
        scan((tasks, task) => R.append(task, tasks), [])
      )
      .subscribe(tasks => observer.next({ id: scene.id, name: scene.name, tasks }))
    // With Gun, we can't tell when all scenes / tasks have arrived so this stream never completes
    // observer.complete()
  })
  return () => sceneLst.map().off()
})

// Retrieves all cronjobs first and then also all tasks for each job in an async fashion.
// It's observer will emit a new cronjob + tasks whenever a new task arrives over the network and never ends.
const cronjob$ = Observable.create(observer => {
  const cronjobLst = peer.get('crontab')
  cronjobLst
    // Iterate over available jobs, but filter out old-nulled-out cronjobs
    .map(j => (j === null ? undefined : j))
    .on(
      cronjob => {
        // NOTE / PENDING: Since we *still* get null-objects here when the backend removes processed temporary cronjobs,
        // *despite* we're filtering out nulls above, we need this additional conditional logic here. Might be a bug in
        // GunDB?!
        if (R.isNil(cronjob)) {
          observer.error(cronjob)
        } else {
          const tasksHndlr = hndl =>
            cronjobLst
              .get(cronjob.jobId)
              .get('tasks')
              .map()
              .once(hndl)
          fromEventPattern(tasksHndlr)
            .pipe(
              map(t => R.dissoc('_', R.head(t))),
              scan((tasks, task) => R.append(task, tasks), [])
            )
            .subscribe(tasks => {
              // log.debug(`got a remote cronjob: ${JSON.stringify(R.assoc('tasks', tasks, R.dissoc('_', cronjob)))}`)
              return observer.next(R.assoc('tasks', tasks, R.dissoc('_', cronjob)))
            })
          // With Gun, we can't tell when all scenes / tasks have arrived so this stream never completes :(
          // observer.complete()
        }
      },
      { change: true }
    )
  return () => cronjobLst.map().off()
})

const fermenterState$ = (unsubscribe = false) => {
  const fermenterNode = peer.get('fermenter')

  if (unsubscribe) {
    fermenterNode.get('env').off()
    fermenterNode.get('rts').off()
    fermenterNode
      .get('rts')
      .get('tempLimits')
      .off()
    fermenterNode
      .get('rts')
      .get('humidityLimits')
      .off()
    fermenterNode
      .get('rts')
      .get('notifications')
      .off()
    return empty
  }

  const env$ = createValueStreamFromPath(fermenterNode, ['env'])
  const rts$ = createValueStreamFromPath(fermenterNode, ['rts'])
  const tempLimit$ = createValueStreamFromPath(fermenterNode, ['rts', 'tempLimits'])
  const humLimit$ = createValueStreamFromPath(fermenterNode, ['rts', 'humidityLimits'])
  const notification$ = createValueStreamFromPath(fermenterNode, ['rts', 'notifications'])

  return zip(env$, rts$, tempLimit$, humLimit$, notification$).pipe(
    auditTime(50),
    map(([env, rts, tempLimits, humidityLimits, notifications]) => ({
      env,
      rts: R.merge(rts, { tempLimits, humidityLimits, notifications }),
    }))
  )
}

function createPeer() {
  return {
    peer,
    getLivestate$() {
      return knxLiveAddr$
    },
    getScenes$() {
      return scenes$
    },
    getCronjobs$() {
      return cronjob$
    },
    sendUpdateGroupAddrReq,
    getFermenterState$() {
      return fermenterState$()
    },
    unsubscribeFromFermenterState$() {
      return fermenterState$(true)
    },
  }
}

export { createPeer }
