// @flow

import type { KnxAddress } from '../types'
import * as R from 'ramda'
import { fromEventPattern } from 'rxjs'
import { map } from 'rxjs/operators'

// Helps in switching from on to off (lights, ...) and the other way around
export const toggleAddrVal = (address: KnxAddress) => R.assoc('value', !address.value | 0, address)

// Creates an observable stream for reading a value / object from a path in a GunDB-database, e.g.
// #createValueStreamFromPath(fermenterNode, ['env'])
export const createValueStreamFromPath = (root: any, path: array<string>) => {
  const peerNode = R.reduce((node, key) => node.get(key), root, path)
  return fromEventPattern(hndl => peerNode.on(hndl), hndl => peerNode.off(hndl)).pipe(
    map(
      R.pipe(
        R.head,
        R.dissoc('_')
      )
    )
  )
}
