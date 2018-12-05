import React from 'react'

import Layout from '../components/layout'
import FermenterIndex from '../components/fermenter'
import { FermenterContext } from '../context/root'

const FermenterPage = () => {
  return (
    <FermenterContext.Provider>
      <Layout>
        <FermenterIndex />
      </Layout>
    </FermenterContext.Provider>
  )
}

export default FermenterPage
