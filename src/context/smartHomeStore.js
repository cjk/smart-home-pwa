// @flow

import type { SmartHomeState } from '../types.js'

import * as R from 'ramda'
import { act, createStore, react, select } from 'zedux'

// import { logger } from '../lib/debug'

// const log = logger('smtHomeStore')

const initialState: SmartHomeState = {
  livestate: {},
}

export const upsertKnxAddr = act('upsertKnxAddr')
export const setKnxAddrVal = act('setKnxAddrVal')

export const getLivestate = select(state => state.livestate)

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