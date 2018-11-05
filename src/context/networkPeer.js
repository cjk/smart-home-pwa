// @flow

import Gun from 'gun'
import { Observable } from 'rxjs'
import * as R from 'ramda'

// import { map, mergeMap, flatMap, switchMap, tap, toArray } from 'rxjs/operators'

import { logger } from '../lib/debug'

const log = logger('networkPeer')

const peer = Gun('http://localhost:8765/gun')

const addrLst = peer.get('knxAddrList')

const knxLiveAddr$ = Observable.create(observer => {
  addrLst.map().on(addr => {
    observer.next(R.dissoc('_', addr))
    // Never completes
    // observer.complete()
  })
  return () => addrLst.map().off()
})

const sendUpdateGroupAddrReq = (addrId, newValue) => {
  peer
    .get('knxRequests')
    .get(addrId)
    .put({ action: 'write', value: newValue })
}

function createPeer() {
  return {
    peer,
    getLivestate$() {
      return knxLiveAddr$
    },
    sendUpdateGroupAddrReq,
  }
}

export { createPeer }
