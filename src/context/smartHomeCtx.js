// @flow

import type { SmartHomeState } from '../types.js'

import { react } from 'zedux'

// import {
//   findParts,
// } from './smartHomeActions'

// import { findModels, fetchModels, setModelNo } from './modelActions'

// import { logger } from '../lib/debug'

// const log = logger('ctx')

const initialState: SmartHomeState = {
  livestate: {},
}

export default react(initialState)
// .to(smartHomeUpdated)
// .withReducers((state, { payload: event }) => {})
// .withProcessors((dispatch, action, state) => dispatch(findParts(state.userInput)))
