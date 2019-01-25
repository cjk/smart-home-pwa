// @flow

// Container-component for all dashboard logic

import type { KnxAddress } from '../types'

import React, { useEffect } from 'react'
import * as R from 'ramda'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { withSmartHomeCtx } from '../context/root'
import { withStyles } from '@material-ui/core/styles'

import OverviewLights from './overviewLights'

import { useOffline, useVisibility } from '../lib/hooks'
import { toggleAddrVal } from '../lib/utils'

type Props = {
  smartHomeStore: any,
  classes: Object,
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  offlineMessage: {
    marginTop: '5em',
  },
})

const Dashboard = ({ classes, smartHomeStore }: Props) => {
  const {
    onLivestateOnline,
    onLivestateOffline,
    onVisibilityChange,
    selManuallySwitchedLights,
    setKnxAddrVal,
  } = smartHomeStore
  const onLightSwitch = (addr: KnxAddress) => setKnxAddrVal(toggleAddrVal(addr))

  useVisibility(onVisibilityChange)

  // Handle (re-) subscriptions to livestate when we go offline
  const isOffline = useOffline()
  useEffect(() => {
    if (isOffline) {
      onLivestateOffline()
    } else {
      onLivestateOnline()
    }
  }, [isOffline])

  return isOffline ? (
    <Typography className={classes.offlineMessage} variant="h5">
      Still loading address-state ...
    </Typography>
  ) : (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <OverviewLights
          addresses={selManuallySwitchedLights()}
          onLightSwitch={onLightSwitch}
          className={classes.control}
        />
      </Grid>
    </Grid>
  )
}

export default R.compose(
  withStyles(styles),
  withSmartHomeCtx
)(Dashboard)
