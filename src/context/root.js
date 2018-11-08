// @flow

import {
  createSmartHomeStore,
  selLivestate,
  selManuallySwitchedLights,
  selScenes,
  setKnxAddrVal,
} from './smartHomeStore'

import { StoreApi, createContext } from 'react-zedux'
import { createStore } from 'zedux'
import { createPeer } from './networkPeer'

import { logger } from '../lib/debug'

const log = logger('rootCtx')

const Peer = createPeer()
const smartHomeStore = createSmartHomeStore(Peer)

// Create Reactor
class smartHomeApi extends StoreApi {
  store = smartHomeStore

  static actors = {
    setKnxAddrVal,
  }

  static selectors = { selLivestate, selManuallySwitchedLights, selScenes }
}

// Build store hierarchy. The root-store itself doesn't have a purpose yet
const rootStore = createStore().use({
  smartHome: smartHomeStore,
  // TODO: this will become it's own store once we get to it.
  // Look at https://bowheart.github.io/react-zedux/guides/timeTravel.html for hints on how to make a fermenter-store
  // accessible in the fermenter-component hierarchy
  fermenter: {},
})

// // DEBUGGING
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

// Partially apply withRoot-Component with root-store
// const withRootCtx = RootContext.consume('rootStore')
const withSmartHomeCtx = SmartHomeContext.consume('smartHomeStore')

export { SmartHomeContext, withSmartHomeCtx }
