// @flow

import type { Subscription } from 'rxjs'

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
  scenes: { [id: string]: Scene },
  crontab: { [id: string]: CrontabTask },
  cloudSubscriptions: {
    livestate: Subscription,
  },
  cloudManager: ?any,
  // eventHistory: Array<BusEvent>,
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

export type FermenterEnv = {
  createdAt: number,
  temperature: number,
  humidity: number,
  isValid: boolean,
  errors: number,
  iterations: number,
}

export type FermenterRunTimeState = {
  active: boolean,
  status: string,
  hasEnvEmergency: boolean,
  hasDeviceMalfunction: boolean,
  currentCmd: ?string,
  tempLimits: { lower: number, upper: number },
  humidityLimits: { lower: number, upper: number },
  notifications: Notifications,
}

export type FermenterState = {
  env: FermenterEnv,
  rts: FermenterRunTimeState,
}
