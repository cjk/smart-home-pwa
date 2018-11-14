// @flow

export type KnxAddress = {
  id: string,
  name: string,
  value: ?string,
  story: ?string,
  room: ?string,
  type: ?string,
  func: ?string,
  fbAddr: ?string,
  fbValue: ?string,
  control: string,
  updatedAt: number,
}

export type SmartHomeState = {
  livestate: { [id: string]: KnxAddress },
  eventHistory: Array<BusEvent>,
}

// Scene types

export type Scene = {
  id: string,
  name: string,
  tasks: CrontabTask,
}
export type Scenes = Array<Scene>

/* Cronjob types */

export type Task = {
  id: number,
  status: string,
  startedAt: ?number,
  endedAt: ?number,
  target: string,
  act: string,
}

export type TaskEvent = Task & { jobId: string }

export type CrontabTask = {
  [string]: 'on' | 'off',
}

export type CronJob = {
  jobId: string,
  name: string,
  at: string,
  repeat: string,
  scheduled: boolean,
  running: boolean,
  lastRun: Date | null,
  tasks: CrontabTask | Task,
}

export type Crontab = Array<CronJob>

type Room = {
  name: string,
  story: string,
}

export type Rooms = {
  [id: string]: Room,
}

export type Prefs = {
  rooms: Array<string>,
  showOnlyActive: boolean,
}

export type AddressMap = { [id: string]: KnxAddress }
