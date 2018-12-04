// @flow

import {
  createSmartHomeStore,
  selLivestate,
  selManuallySwitchedLights,
  selScenes,
  selCrontab,
  setKnxAddrVal,
  activateScene,
} from './smartHomeStore'

import {
  createFermenterStore,
  selFermenterRts,
  selEnv,
  selLimits,
  updateState,
  setFermenterCommand,
} from './fermenterStore'

import { StoreApi, createContext } from 'react-zedux'
import { createPeer } from './networkPeer'

// import { logger } from '../lib/debug'

// const log = logger('rootCtx')

const Peer = createPeer()

// Create store and reactor for smartHome context
const smartHomeStore = createSmartHomeStore(Peer)
class smartHomeApi extends StoreApi {
  store = smartHomeStore

  static actors = {
    setKnxAddrVal,
    activateScene,
  }

  static selectors = { selLivestate, selManuallySwitchedLights, selScenes, selCrontab }
}

// Create store and reactor for fermenter context
const fermenterStore = createFermenterStore(Peer)
class fermenterApi extends StoreApi {
  store = fermenterStore

  static actors = {
    updateState,
    setFermenterCommand,
  }

  static selectors = { selEnv, selFermenterRts, selLimits }
}

// PENDING: NOT USED YET - not sure if we'll ever need it, for now a separate smartHome- and fermenter-store seem
// sufficient.

// // Build store hierarchy. The root-store itself doesn't have a purpose yet
// const rootStore = createStore().use({
//   smartHome: smartHomeStore,
//   // TODO: this will become it's own store once we get to it.
//   // Look at https://bowheart.github.io/react-zedux/guides/timeTravel.html for hints on how to make a fermenter-store
//   // accessible in the fermenter-component hierarchy
//   fermenter: {},
// })

// // DEBUGGING / DEMO
// rootStore.inspect((storeBase, action) => {
//   console.log('Root Store inspector received action', action)
// })
// rootStore.subscribe((newState, oldState) => {
//   console.log('Root Store state updated', newState)
// })
// smartHomeStore.inspect((storeBase, action) => {
//   console.log('Store "smartHome" inspector received action', action)
// })

// const RootContext = createContext(RootApi)
const SmartHomeContext = createContext(smartHomeApi)
const FermenterContext = createContext(fermenterApi)

// Partially apply store-components for consumption
const withSmartHomeCtx = SmartHomeContext.consume('smartHomeStore')
const withFermenterCtx = FermenterContext.consume('fermenterStore')

export { SmartHomeContext, FermenterContext, withSmartHomeCtx, withFermenterCtx }
