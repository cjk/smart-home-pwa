// @flow

import createSmartHomeStore, { upsertKnxAddr, getLivestate } from './smartHomeStore'

import { StoreApi, createContext } from 'react-zedux'
import { createStore } from 'zedux'
import { catchError } from 'rxjs/operators'

import { knxLiveAddr$ } from './peerStreams'

import { logger } from '../lib/debug'

const log = logger('rootCtx')

const smartHomeStore = createSmartHomeStore()

// Create Reactor
class smartHomeApi extends StoreApi {
  store = smartHomeStore

  // static actors = {
  //   findModels,
  // }

  static selectors = { getLivestate }
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

const sub = knxLiveAddr$
  .pipe(
    catchError(err => {
      log.error(`An error occured: %O - canceling subscription`, err)
      sub.unsubscribe()
    })
  )
  .subscribe(
    addr => {
      // log.debug(`KNX-address value changed / was added: ${JSON.stringify(addr)}`)
      smartHomeStore.dispatch(upsertKnxAddr(addr))
    },
    err => log.error(`got an error: ${err}`),
    () => log.debug('KNX-address update stream completed!')
  )

setTimeout(() => {
  sub.unsubscribe()
  log.debug('unsubscribed!')
  log.debug(`final state is ${JSON.stringify(smartHomeStore.getState())}`)
}, 60000)

// const RootContext = createContext(RootApi)
const SmartHomeContext = createContext(smartHomeApi)

// Partially apply withRoot-Component with root-store
// const withRootCtx = RootContext.consume('rootStore')
const withSmartHomeCtx = SmartHomeContext.consume('smartHomeStore')

export { SmartHomeContext, withSmartHomeCtx }
