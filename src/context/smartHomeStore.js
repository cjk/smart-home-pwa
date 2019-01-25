// @flow

import type { SmartHomeState, AddressMap, KnxAddress, Scenes } from '../types.js'

import * as R from 'ramda'
import { act, createStore, react, select } from 'zedux'
import { buffer, debounceTime, distinct, catchError, tap } from 'rxjs/operators'
import { createCronjobFromScene } from './cronjobs'
import { logger } from '../lib/debug'

// Filter-conditions for addresses
const isOn = (addr: KnxAddress) => addr.value === 1
const isLight = (addr: KnxAddress) => addr.func === 'light'
const noFeedback = (addr: KnxAddress) => addr.type !== 'fb'
// const onlyButtonControlled = (addr: KnxAddress) => addr.control === 'btn'

const log = logger('smtHomeStore')

const initialState: SmartHomeState = {
  livestate: {},
  scenes: {},
  crontab: {},
  cloudSubscriptions: {},
  cloudManager: undefined,
}

export const upsertKnxAddr = act('upsertKnxAddr')
export const upsertScenes = act('upsertScenes')
export const upsertCronjobs = act('upsertCronjobs')
export const setKnxAddrVal = act('setKnxAddrVal')
export const activateScene = act('activateScene')
export const onLivestateOnline = act('onLivestateOnline')
export const onLivestateOffline = act('onLivestateOffline')
export const onVisibilityChange = act('onVisibilityChange')

export const selLivestate: AddressMap = select(state => state.livestate)
export const selManuallySwitchedLights: AddressMap = select(selLivestate, addrLst =>
  R.filter(R.allPass([isOn, isLight, noFeedback]), addrLst)
)
export const selScenes: Scenes = select(state => state.scenes)
export const selCrontab: Crontab = select(state => state.crontab)

const subscribeToLiveAddressState = (Peer, dispatch) => {
  return Peer.getLivestate$()
    .pipe(
      // Current observable using #map().on() can produce duplicate address-contents, so we filter them here:
      distinct(),
      catchError(err => {
        log.error(`An error occured while handling KNX live-updates: %O`, err)
      })
    )
    .subscribe(
      addr => {
        // log.debug(`KNX-address value changed / was added: ${JSON.stringify(addr)}`)
        dispatch(upsertKnxAddr(addr))
      },
      err => log.error(`got an error: ${err}`),
      () => log.debug('KNX-address update stream completed!')
    )
}

// TODO: Refactor out into own module?!
const syncScenesToStore = (Peer, store) => {
  // Returns an array of arrived scenes every 2 seconds
  const scene$ = Peer.getScenes$()
  const subscription = scene$
    .pipe(
      // Hold new scene-changes back for some time to prevent too rapid screen-updates
      buffer(scene$.pipe(debounceTime(100))),
      catchError(err => {
        log.error(`An error occured while loading scenes from remote-peers: %O`, err)
      })
    )
    .subscribe(
      sceneAry => {
        // log.debug(`One or more updated remote scenes arrived: ${JSON.stringify(sceneAry)}`)
        store.dispatch(upsertScenes(sceneAry))
      },
      err => log.error(`got an error: ${err}`),
      () => log.debug('Scene update stream completed!')
    )

  return subscription
}

// TODO: Refactor out into own module?!
const syncCronjobsToStore = (Peer, store) => {
  // Returns an array of arrived cronjobs every 2 seconds
  const cronjob$ = Peer.getCronjobs$()
  const subscription = cronjob$
    .pipe(
      // Hold new cronjob-changes back for some time to prevent too rapid screen-updates
      buffer(cronjob$.pipe(debounceTime(100))),
      // tap(s => log.debug('got cronjob with 1-n tasks: %O', s)),
      catchError(err => {
        log.error(`An error occured while loading cronjobs from remote-peers: %O`, err)
        return []
      })
    )
    .subscribe(
      cronjobAry => {
        // log.debug(`One or more updated remote cronjobs arrived: ${JSON.stringify(sceneAry)}`)
        store.dispatch(upsertCronjobs(cronjobAry))
      },
      err => log.error(`got an error: ${err}`),
      () => log.debug('Cronjob update stream completed!')
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
    .withProcessors((dispatch, action, _state) => {
      const { payload: addr } = action
      log.debug(`Changing address from <?> to ${JSON.stringify(addr)}`)
      Peer.peer
        .get('knxAddrList')
        .get(addr.id)
        .put({ value: addr.value })
    })
    .to(upsertCronjobs)
    .withReducers((state, { payload }) => {
      // Updated Cronjobs arrive in a array and may contain the same job-id several times, as it was updated over time
      // with incoming task-elements
      return R.pipe(
        R.reduce((acc, cronjob) => R.assoc(cronjob.jobId, cronjob, acc), state.crontab),
        R.assoc('crontab', R.__, state)
      )(payload)
    })
    .to(upsertScenes)
    .withReducers((state, { payload }) => {
      // Updated Scenes arrive in a array and may contain the same scene-id several times, as it was updated over time
      // with incoming task-elements
      return R.pipe(
        R.reduce((acc, scene) => R.assoc(scene.id, scene, acc), state.scenes),
        R.assoc('scenes', R.__, state)
      )(payload)
    })
    .to(activateScene)
    .withProcessors((dispatch, action, state) => {
      const { sceneId, activate } = action.payload
      const cronjob = createCronjobFromScene(sceneId, R.path(['scenes', sceneId, 'tasks'], state), activate)
      log.debug(`Created cron-job: ${JSON.stringify(cronjob)}`)
      Peer.peer
        .get('crontab')
        .get(cronjob.jobId)
        .put(cronjob)
    })
    .to(onLivestateOnline)
    .withProcessors((dispatch, action, state) => {
      log.debug('(Re-) subscribing to address-stream')
      const sub = subscribeToLiveAddressState(state.cloudManager, dispatch)
      // Use a zedux inducer to partially update our store-state with the current livestate-subscription, so we can
      // unsubscribe later!
      dispatch(() => ({ cloudSubscriptions: { livestate: sub } }))
    })
    .to(onLivestateOffline)
    .withProcessors((dispatch, action, state) => {
      log.debug('Unsubscribing from address-stream')
      state.cloudSubscriptions.livestate.unsubscribe()
    })
    .to(onVisibilityChange)
    .withProcessors((dispatch, action, state) => {
      log.debug(`App-visibility changed to <${action.payload}>`)
      // Renew knx-state subscription if App was hidden and is now visible again, since the content might have changed
      // in the meantime:
      if (action.payload === 'visible') {
        state.cloudSubscriptions.livestate.unsubscribe()
        const sub = subscribeToLiveAddressState(state.cloudManager, dispatch)
        dispatch(() => ({ cloudSubscriptions: { livestate: sub } }))
      }
    })

  const store = createStore()
  store.use(smartHomeReactor)

  // After store-reactor is established, add PeerDB-object to our global state.
  // This helps managing on-/offline state by (un-) subscribing when connection is dropped.
  store.dispatch(state => R.assoc('cloudManager', Peer, state))

  // PENDING: Unlike (address-) livestate, scenes and cronjobs are only subscribed to *once* and thus not refreshed when we were offline at some time.
  // If this bothers you, make those subscriptions also dynamically managed - see #subscribeToLiveAddressState and the
  // useOffline-hook in dashboard-/map-index component.
  syncScenesToStore(Peer, store)
  syncCronjobsToStore(Peer, store)

  return store
}

export { createSmartHomeStore }
