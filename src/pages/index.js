import React from 'react'

import Layout from '../components/layout'
import Dashboard from '../components/dashboard'

import { SmartHomeContext } from '../context/root'

const IndexPage = props => {
  return (
    <SmartHomeContext.Provider>
      <Layout>
        <Dashboard />
      </Layout>
    </SmartHomeContext.Provider>
  )
}

export default IndexPage
