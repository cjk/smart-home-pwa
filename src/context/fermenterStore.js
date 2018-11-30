// @flow

import type { FermenterState, FermenterRunTimeState } from '../types.js'

import * as R from 'ramda'
import { act, createStore, react, select } from 'zedux'
import { catchError } from 'rxjs/operators'

import { logger } from '../lib/debug'

const log = logger('fermenterStore')

const initialState: FermenterState = {
  env: {
    temperature: 0,
    humidity: 0,
    createdAt: Date.now(),
    errors: 0,
    emergency: false,
    isValid: true,
    iterations: 0,
  },
  rts: {
    active: false,
    status: 'not-connected',
    hasEnvEmergency: false,
    hasDeviceMalfunction: false,
    currentCmd: 'none',
    tempLimits: { lower: 28, upper: 30 },
    humidityLimits: { lower: 61, upper: 67 },
    notifications: {},
  },
}

export const updateRts = act('updateRts')
export const setTempLimits = act('setTempLimits')
export const setHumLimits = act('setHumLimits')
export const setFermenterCommand = act('setFermenterCommand')

export const selFermenterRts: FermenterRunTimeState = select(state => state.rts)
export const selLimits = select(state => ({ tempLimits: state.tempLimits, humidityLimits: state.humidityLimits }))

// Return subscription for remote run-time-state changes
const handleFermenterUpdates = (Peer, store) => {
  const subscription = Peer.getFermenterState$()
    .pipe(
      catchError(err => {
        log.error(`An error occured while handling Fermenter live-updates: %O`, err)
      })
    )
    .subscribe(
      (newState: FermenterRunTimeState) => {
        log.debug(`Fermenter-state changed / was added: ${JSON.stringify(newState)}`)
        // store.dispatch(updateRts(rts))
      },
      err => log.error(`got an error: ${err}`),
      () => log.debug('Fermenter RT-state update-tream completed!')
    )

  return subscription
}

function createFermenterStore(Peer) {
  const fermenterReactor = react(initialState)
    .to(updateRts)
    .withReducers((state: FermenterState, { payload }) => {
      return R.assoc('rts', payload, state)
    })
    .to(setFermenterCommand)
    .withReducers((state: FermenterState, { payload }) => {
      return R.assocPath(['rts', 'currentCmd'], payload, state)
    })

  const store = createStore()
  store.use(fermenterReactor)

  // Activate handlers - must occur *after* store-reactor is established!
  handleFermenterUpdates(Peer, store)

  return store
}

export { createFermenterStore }
