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

export const updateState = act('updateState')
export const setTempLimits = act('setTempLimits')
export const setHumLimits = act('setHumLimits')
export const setFermenterCommand = act('setFermenterCommand')
export const startFermenterData = act('startFermenterData')
export const stopFermenterData = act('stopFermenterData')

export const selDevices: FermenterRunTimeState = select(state => state.devices)
export const selEnv = select(state => state.env)
export const selIsRunning = select(state => state.rts.active)
export const selLimits = select(state => ({
  tempLimits: state.rts.tempLimits,
  humidityLimits: state.rts.humidityLimits,
}))

function createFermenterStore(Peer) {
  const fermenterReactor = react(initialState)
    .to(updateState)
    .withReducers((state: FermenterState, { payload }) => {
      return R.merge(state, payload)
    })

    .to(setFermenterCommand)
    .withReducers((state: FermenterState, { payload }) => {
      return R.assocPath(['rts', 'currentCmd'], payload, state)
    })
    .withProcessors((dispatch, action, state) => {
      Peer.getFermenterRts()
        .get('currentCmd')
        .put(action.payload)
    })

    .to(setTempLimits)
    // NOTE We decided against a reducer here since our processor changes the remote state, which will bounce back to us
    // via our updateState-action (see above), thus we'd write the same update twice with millis in between.
    .withProcessors((dispatch, action, state) => {
      const [lower, upper] = action.payload

      Peer.getFermenterRts()
        .get('tempLimits')
        .put({ lower, upper })
    })

    .to(startFermenterData)
    .withProcessors((dispatch, action, state) => {
      Peer.subscribeToFermenterState$()
        .pipe(
          catchError(err => {
            log.error(`An error occured while handling Fermenter live-updates: %O`, err)
          })
        )
        .subscribe(
          (newState: FermenterRunTimeState) => {
            log.debug(`Fermenter-state changed / was added: ${JSON.stringify(newState)}`)
            dispatch(updateState(newState))
          },
          err => log.error(`got an error: ${err}`),
          () => log.debug('Fermenter RT-state update-tream completed!')
        )
    })

    .to(stopFermenterData)
    .withProcessors((dispatch, action, state) => {
      Peer.unsubscribeFromFermenterState$()
    })

  const store = createStore()
  store.use(fermenterReactor)

  return store
}

export { createFermenterStore }
