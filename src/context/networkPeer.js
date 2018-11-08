// @flow

import Gun from 'gun'
import { Observable } from 'rxjs'
import * as R from 'ramda'

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

const scenes$ = Observable.create(observer => {
  const sceneLst = peer.get('scenes')
  sceneLst.map().once(scene => {
    observer.next(R.dissoc('_', scene))
    // Even though we use #once we can't tell if all scenes arrived so this stream never completes :(
    // observer.complete()
  })
  return () => sceneLst.map().off()
})

function createPeer() {
  return {
    peer,
    getLivestate$() {
      return knxLiveAddr$
    },
    getScenes$() {
      return scenes$
    },
    sendUpdateGroupAddrReq,
  }
}

export { createPeer }
