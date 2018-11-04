// @flow

import type { SmartHomeState, AddressMap, KnxAddress } from '../types.js'

import * as R from 'ramda'
import { act, createStore, react, select } from 'zedux'

// Filter-conditions for addresses
const isOn = (addr: KnxAddress) => addr.value === 1
const isLight = (addr: KnxAddress) => addr.func === 'light'
const noFeedback = (addr: KnxAddress) => addr.type !== 'fb'
const onlyButtonControlled = (addr: KnxAddress) => addr.control === 'btn'

// import { logger } from '../lib/debug'

// const log = logger('smtHomeStore')

const initialState: SmartHomeState = {
  livestate: {},
}

export const upsertKnxAddr = act('upsertKnxAddr')
export const setKnxAddrVal = act('setKnxAddrVal')

export const selLivestate: AddressMap = select(state => state.livestate)
export const selManuallySwitchedLights: AddressMap = select(selLivestate, addrLst =>
  R.filter(R.allPass([isOn, isLight, noFeedback, onlyButtonControlled]), addrLst)
)

const smartHomeReactor = react(initialState)
  .to(upsertKnxAddr)
  .withReducers((state, { payload }) => {
    return R.assocPath(['livestate', payload.id], payload, state)
  })
// .withProcessors((dispatch, action, state) => dispatch(findParts(state.userInput)))

function createSmartHomeStore() {
  return createStore().use(smartHomeReactor)
}

export default createSmartHomeStore
