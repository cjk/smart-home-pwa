import React from 'react'

import Layout from '../components/layout'
import Crontab from '../components/crontab'

import { SmartHomeContext } from '../context/root'

const CrontabPage = props => {
  return (
    <SmartHomeContext.Provider>
      <Layout>
        <Crontab />
      </Layout>
    </SmartHomeContext.Provider>
  )
}

export default CrontabPage
