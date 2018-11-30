import React from 'react'

import Layout from '../components/layout'
import Groundfloor from '../components/maps'

import { SmartHomeContext } from '../context/root'

const MapPage = props => {
  return (
    <SmartHomeContext.Provider>
      <Layout>
        <Groundfloor />
      </Layout>
    </SmartHomeContext.Provider>
  )
}

export default MapPage
