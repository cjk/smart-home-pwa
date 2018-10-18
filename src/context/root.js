// @flow

// TODO: Our smartHome-context
// import smartHomeCtx from './smartHome/context'

import { StoreApi, createContext } from 'react-zedux'
import { createStore } from 'zedux'

// TODO: Import selectors from context
// import {
//   blabla,
// } from './smartHome/selectors'

// TODO: Perhaps import those too?
// import { setSelectedPart, updateUserInput, findParts, getPartValidities } from './partSearch/partActions'
// import { setModelNo, findModels } from './partSearch/modelActions'
// import { setCgCsg } from './partSearch/topologyActions'

// Create Reactor
class RootApi extends StoreApi {
  // TODO: not yet ready:
  // store = createStore().use({
  //   partSearchCtx,
  // })

  store = createStore().hydrate({ hello: 'world' })

  // static actors = {
  //   findModels,
  //   findParts,
  //   getPartValidities,
  //   setModelNo,
  //   setCgCsg,
  //   setSelectedPart,
  //   updateUserInput,
  // }

  // static selectors = { activeUserInput, modelResults, partResults, selectedPart, topologyResults, partValidities }
}

const RootContext = createContext(RootApi)

export default RootContext
// Partially apply withRoot-Component with root-store
export const withRootCtx = RootContext.consume('rootStore')
