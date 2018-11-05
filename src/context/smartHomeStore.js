// @flow

import type { SmartHomeState, AddressMap, KnxAddress } from '../types.js'

import * as R from 'ramda'
import { act, createStore, react, select } from 'zedux'
import { catchError } from 'rxjs/operators'

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

// Return subscription for remote KNX-state mutations / events and how to act on them
function handleKnxUpdates(peer, store) {
  const subscription = peer
    .getLivestate$()
    .pipe(
      catchError(err => {
        log.error(`An error occured: %O`, err)
      })
    )
    .subscribe(
      addr => {
        // log.debug(`KNX-address value changed / was added: ${JSON.stringify(addr)}`)
        store.dispatch(upsertKnxAddr(addr))
      },
      err => log.error(`got an error: ${err}`),
      () => log.debug('KNX-address update stream completed!')
    )

  // TODO: remove once canceling subscriptions are handled in a better way:
  setTimeout(() => {
    subscription.unsubscribe()
    log.debug('unsubscribed from KNX-state-stream!')
    log.debug(`final state is ${JSON.stringify(store.getState())}`)
  }, 60000)

  return subscription
}

function createSmartHomeStore(peer) {
  const smartHomeReactor = react(initialState)
    .to(upsertKnxAddr)
    .withReducers((state, { payload }) => {
      return R.assocPath(['livestate', payload.id], payload, state)
    })
    .to(setKnxAddrVal)
    .withProcessors((dispatch, action, state) =>
      log.debug(`Changing address from x to ${JSON.stringify(action.payload)}`)
    )

  const store = createStore()
  store.use(smartHomeReactor)

  // Activate handlers - must occur *after* store-reactor is established!
  handleKnxUpdates(peer, store)

  return store
}

export { createSmartHomeStore, handleKnxUpdates }
