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

export type Scene = {
  id: string,
  name: string,
  tasks: CrontabTask,
}
export type Scenes = Array<Scene>

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
