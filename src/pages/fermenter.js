import React from 'react'

import Layout from '../components/layout'
import FermenterInfo from '../components/fermenter/fermenter-info'
import { FermenterContext } from '../context/root'

const FermenterPage = props => {
  return (
    <FermenterContext.Provider>
      <Layout>
        <FermenterInfo />
      </Layout>
    </FermenterContext.Provider>
  )
}

export default FermenterPage
