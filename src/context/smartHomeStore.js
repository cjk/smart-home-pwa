// @flow

import type { SmartHomeState, AddressMap, KnxAddress } from '../types.js'

import * as R from 'ramda'
import { act, createStore, react, select } from 'zedux'
import { logger } from '../lib/debug'

// Filter-conditions for addresses
const isOn = (addr: KnxAddress) => addr.value === 1
const isLight = (addr: KnxAddress) => addr.func === 'light'
const noFeedback = (addr: KnxAddress) => addr.type !== 'fb'
// const onlyButtonControlled = (addr: KnxAddress) => addr.control === 'btn'

const log = logger('smtHomeStore')

const initialState: SmartHomeState = {
  livestate: {},
}

export const upsertKnxAddr = act('upsertKnxAddr')
export const setKnxAddrVal = act('setKnxAddrVal')

export const selLivestate: AddressMap = select(state => state.livestate)
export const selManuallySwitchedLights: AddressMap = select(selLivestate, addrLst =>
  R.filter(R.allPass([isOn, isLight, noFeedback]), addrLst)
)

function createSmartHomeStore(Peer) {
  const smartHomeReactor = react(initialState)
    .to(upsertKnxAddr)
    .withReducers((state, { payload }) => {
      return R.assocPath(['livestate', payload.id], payload, state)
    })
    .to(setKnxAddrVal)
    .withProcessors((dispatch, action, state) =>
      log.debug(`Changing address from x to ${JSON.stringify(action.payload)}`)
    )

  return createStore().use(smartHomeReactor)
}

export default createSmartHomeStore
