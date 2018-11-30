import React from 'react'

import Layout from '../components/layout'
import SceneSelect from '../components/scenes'

import { SmartHomeContext } from '../context/root'

const ScenesPage = props => {
  return (
    <SmartHomeContext.Provider>
      <Layout>
        <SceneSelect />
      </Layout>
    </SmartHomeContext.Provider>
  )
}

export default ScenesPage
