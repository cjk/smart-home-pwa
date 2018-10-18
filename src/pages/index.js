import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import { withRootCtx } from '../context/root'

const IndexPage = props => {
  const { rootStore } = props

  console.log('Rootstore:')
  console.log(rootStore.getState())

  return (
    <Layout>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default withRootCtx(IndexPage)
