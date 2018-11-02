// @flow

// Container-component for all dashboard logic

import type { KnxAddress, Prefs, Rooms, AddressMap } from '../types'

import * as React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import OverviewLights from './overviewLights'

import { withSmartHomeCtx } from '../context/root'
import { setKnxAddrVal } from '../context/smartHomeStore'

import { toggleAddrVal, onlyManuallySwitchedLights } from '../lib/utils'

import { compose } from 'ramda'

type Props = {
  livestate: AddressMap,
  prefs: Prefs,
  rooms: Rooms,
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
  const { getLivestate } = smartHomeStore
  const onLightSwitch = (addr: KnxAddress) => smartHomeStore.dispatch(setKnxAddrVal(toggleAddrVal(addr)))

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <OverviewLights
          addresses={onlyManuallySwitchedLights(getLivestate())}
          onLightSwitch={onLightSwitch}
          className={classes.control}
        />
      </Grid>
    </Grid>
  )
}

export default compose(
  withStyles(styles),
  withSmartHomeCtx
)(Dashboard)
