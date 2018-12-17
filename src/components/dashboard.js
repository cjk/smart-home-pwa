// @flow

// Container-component for all dashboard logic

import type { KnxAddress } from '../types'

import React from 'react'
import * as R from 'ramda'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { withSmartHomeCtx } from '../context/root'
import { withStyles } from '@material-ui/core/styles'

import OverviewLights from './overviewLights'

import { useOffline } from '../lib/hooks'
import { toggleAddrVal } from '../lib/utils'

type Props = {
  smartHomeStore: any,
  classes: Object,
}

// TODO
const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
})

const Dashboard = ({ classes, smartHomeStore }: Props) => {
  const { selLivestate, selManuallySwitchedLights, setKnxAddrVal } = smartHomeStore
  const onLightSwitch = (addr: KnxAddress) => setKnxAddrVal(toggleAddrVal(addr))

  return !useOffline() ? (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <OverviewLights
          addresses={selManuallySwitchedLights()}
          onLightSwitch={onLightSwitch}
          className={classes.control}
        />
      </Grid>
    </Grid>
  ) : (
    <Typography variant="h5">Still loading address-state ...</Typography>
  )
}

export default R.compose(
  withStyles(styles),
  withSmartHomeCtx
)(Dashboard)
