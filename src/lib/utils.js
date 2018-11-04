// @flow

import type { KnxAddress } from '../types'
import * as R from 'ramda'

export const toggleAddrVal = (address: KnxAddress) => R.assoc('value', !address.value | 0, address)
