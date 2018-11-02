import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

// import { foo } from '../context/smartHomeStore'
import { withSmartHomeCtx } from '../context/root'

const IndexPage = props => {
  const { smartHomeStore } = props

  console.log('SmartHomeStore:')
  console.log(smartHomeStore.getState())

  return (
    <Layout>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default withSmartHomeCtx(IndexPage)
