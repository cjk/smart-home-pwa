// @flow

import React from 'react'
import * as R from 'ramda'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import StartIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'

import FermenterIndicator from './fermenter-indicator'
import FermenterDevice from './fermenter-device'
import FermenterTempControl from './fermenter-temp-control'

import { withStyles } from '@material-ui/core/styles'
import { withFermenterCtx } from '../../context/root'

type Props = {
  fermenterStore: any,
  classes: Object,
}

const fermenterControlStyles = {
  controlsContainer: {
    marginTop: 20,
    flexGrow: 1,
    //     flexDirection: 'column',
  },
  controlItem: {},
  fermenterDetails: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  fermenterIcon: {
    display: 'block',
    margin: 'auto',
  },
  fermenterCard: {
    display: 'flex',
  },
  devControls: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    flexDirection: 'column',
    height: 'auto',
  },
  tempRangeControl: {
    marginTop: 10,
  },
}

const FermenterControl = ({ fermenterStore, classes }: Props) => {
  const { selDevices, selIsRunning, selLimits, setTempLimits, setFermenterCommand } = fermenterStore

  const toggleDevice = name => {
    /* Only allow switching fermenter itself on/off for now */
    if (name !== 'fermenter') {
      return false
    }
    return selIsRunning() ? setFermenterCommand('stop') : setFermenterCommand('start')
  }

  return (
    <Grid container spacing={24} className={classes.controlsContainer}>
      <Grid item xs={12} sm={6} className={classes.controlItem}>
        <Card className={classes.fermenterCard}>
          <div className={classes.fermenterDetails}>
            <CardContent className={classes.fermenterIcon}>
              <FermenterIndicator isOn={selIsRunning()} />
            </CardContent>
            <CardActions className={classes.devControls}>
              <Button color="default" variant="contained" onClick={() => toggleDevice('fermenter')}>
                {selIsRunning() ? <StopIcon /> : <StartIcon />}
              </Button>

              <Divider className={classes.tempRangeControl} />

              <FermenterTempControl tempLimits={selLimits().tempLimits} changeAction={setTempLimits} />
            </CardActions>
          </div>
        </Card>
      </Grid>
      {R.compose(
        R.values,
        R.mapObjIndexed((dev, name) => (
          <Grid item xs={6} sm={3} className={classes.controlItem} key={name}>
            <FermenterDevice {...dev} name={name} />
          </Grid>
        ))
      )(selDevices())}
    </Grid>
  )
}

export default R.compose(
  withStyles(fermenterControlStyles),
  withFermenterCtx
)(FermenterControl)
