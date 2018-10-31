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
