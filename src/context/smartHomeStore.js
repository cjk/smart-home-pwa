// @flow

import type { SmartHomeState, AddressMap, KnxAddress, Scenes } from '../types.js'

import * as R from 'ramda'
import { act, createStore, react, select } from 'zedux'
import { bufferTime, catchError, filter, tap } from 'rxjs/operators'

import { logger } from '../lib/debug'

// Filter-conditions for addresses
const isOn = (addr: KnxAddress) => addr.value === 1
const isLight = (addr: KnxAddress) => addr.func === 'light'
const noFeedback = (addr: KnxAddress) => addr.type !== 'fb'
// const onlyButtonControlled = (addr: KnxAddress) => addr.control === 'btn'

const log = logger('smtHomeStore')

const initialState: SmartHomeState = {
  livestate: {},
  scenes: [],
}

export const upsertKnxAddr = act('upsertKnxAddr')
export const upsertScenes = act('upsertScenes')
export const setKnxAddrVal = act('setKnxAddrVal')

export const selLivestate: AddressMap = select(state => state.livestate)
export const selManuallySwitchedLights: AddressMap = select(selLivestate, addrLst =>
  R.filter(R.allPass([isOn, isLight, noFeedback]), addrLst)
)
export const selScenes: Scenes = select(state => state.scenes)

// Return subscription for remote KNX-state mutations / events and how to act on them
const handleKnxUpdates = (Peer, store) => {
  const subscription = Peer.getLivestate$()
    .pipe(
      catchError(err => {
        log.error(`An error occured while handling KNX live-updates: %O`, err)
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

  return subscription
}

const syncScenesToStore = (Peer, store) => {
  // Returns an array of arrived scenes every 2 seconds
  const subscription = Peer.getScenes$()
    .pipe(
      bufferTime(2000),
      filter(ary => !R.isEmpty(ary)),
      tap(v => log.debug('got: %O', v)),
      catchError(err => {
        log.error(`An error occured while loading scenes from remote-peers: %O`, err)
      })
    )
    .subscribe(
      sceneAry => {
        log.debug(`Remote scenes arrived: ${JSON.stringify(sceneAry)}`)
        store.dispatch(upsertScenes(sceneAry))
      },
      err => log.error(`got an error: ${err}`),
      () => log.debug('Scene update stream completed!')
    )

  return subscription
}

function createSmartHomeStore(Peer) {
  const smartHomeReactor = react(initialState)
    .to(upsertKnxAddr)
    .withReducers((state, { payload }) => {
      return R.assocPath(['livestate', payload.id], payload, state)
    })
    .to(setKnxAddrVal)
    .withProcessors((dispatch, action, state) => {
      const { payload: addr } = action
      log.debug(`Changing address from x to ${JSON.stringify(addr)}`)
      Peer.peer
        .get('knxAddrList')
        .get(addr.id)
        .put({ value: addr.value })
    })
    .to(upsertScenes)
    .withReducers((state, { payload }) => {
      return R.assoc('scenes', R.concat(state.scenes, payload), state)
    })

  const store = createStore()
  store.use(smartHomeReactor)

  // Activate handlers - must occur *after* store-reactor is established!
  handleKnxUpdates(Peer, store)

  syncScenesToStore(Peer, store)

  return store
}

export { createSmartHomeStore }
