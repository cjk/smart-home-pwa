// @flow
import type { AddressMap } from '../types'

import React, { useState, useEffect } from 'react'
import * as R from 'ramda'

import TabBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'

import Groundfloor from './groundfloor'
import Firstfloor from './firstfloor'
import Basement from './basement'

import { withSmartHomeCtx } from '../../context/root'
import { withStyles } from '@material-ui/core/styles'
import { useOffline } from '../../lib/hooks'
import { toggleAddrVal } from '../../lib/utils'

import { logger } from '../../lib/debug'

type Props = {
  smartHomeStore: any,
  classes: Object,
}

const log = logger('maps/index')

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabbar: {
    marginTop: '70px',
  },
  offlineMessage: {
    marginTop: '5em',
  },
})

const MapControl = ({ smartHomeStore, classes }: Props) => {
  // Manage local component-state (which tab is active) in a separate local store
  const [currentTab, setCurrentTab] = useState(0)
  const handleTabChange = (event, value) => setCurrentTab(value)

  // For global (smartHome-) state
  const {
    onLivestateOnline,
    onLivestateOffline,
    selLivestate,
    setKnxAddrVal,
  }: { selLivestate: AddressMap } = smartHomeStore
  const livestate = selLivestate()

  // Logic to pass to presentational child-components
  const isOn = addr => (R.has(addr, livestate) ? livestate[addr].value : log.error(`Address <${addr}> not found.`))
  const onLightSwitch = addrId =>
    R.has(addrId, livestate)
      ? setKnxAddrVal(toggleAddrVal(livestate[addrId]))
      : log.error(`Where did you click? Can't trigger anything for unknown addr <${addrId}>`)

  // Handle (re-) subscriptions to livestate when we go offline
  const isOffline = useOffline()
  useEffect(
    () => {
      if (isOffline) {
        onLivestateOffline()
      } else {
        onLivestateOnline()
      }
    },
    [isOffline]
  )

  return isOffline ? (
    <Typography className={classes.offlineMessage} variant="h5">
      Still loading address-state ...
    </Typography>
  ) : (
    <div className={classes.root}>
      <TabBar className={classes.tabbar} position="sticky">
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Ground Floor" />
          <Tab label="First Floor" />
          <Tab label="Basement" />
        </Tabs>
      </TabBar>
      {currentTab === 0 && <Groundfloor isOn={isOn} onLightSwitch={onLightSwitch} />}
      {currentTab === 1 && <Firstfloor isOn={isOn} onLightSwitch={onLightSwitch} />}
      {currentTab === 2 && <Basement isOn={isOn} onLightSwitch={onLightSwitch} />}
    </div>
  )
}

export default R.compose(
  withStyles(styles),
  withSmartHomeCtx
)(MapControl)
