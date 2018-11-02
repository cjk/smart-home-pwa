import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Dashboard from '../components/dashboard'

const IndexPage = props => {
  // const { smartHomeStore } = props

  return (
    <Layout>
      <Dashboard />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
