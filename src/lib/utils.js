// @flow

import type { KnxAddress, AddressMap } from '../types'
import * as R from 'ramda'

// Filter-conditions for addresses
const isOn = addr => addr.value === 1
const isLight = addr => addr.func === 'light'
const noFeedback = addr => addr.type !== 'fb'
const onlyButtonControlled = addr => addr.control === 'btn'

export const toggleAddrVal = (address: KnxAddress) => R.assoc('value', !address.value | 0, address)

export const onlyManuallySwitchedLights = (addresses: AddressMap) =>
  R.filter(R.allPass([isOn, isLight, noFeedback, onlyButtonControlled]))(addresses)
