// @flow

import type { Env } from '../../types'

import React from 'react'
import * as R from 'ramda'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import HumIcon from '@material-ui/icons/Cloud'
import TempIcon from '@material-ui/icons/AcUnit'

import { withStyles } from '@material-ui/core/styles'
import { withFermenterCtx } from '../../context/root'

type Props = {
  env: Env,
  classes: Object,
}

const fermenterInfoStyles = {
  infoCard: {
    marginTop: 20,
    padding: 15,
  },
  infoDetails: {
    display: 'flex',
    alignItems: 'baseline',
  },
  deviceReading: {
    marginRight: 20,
    padding: 10,
  },
}

const FermenterInfo = ({ fermenterStore, classes }: Props) => {
  const { selEnv } = fermenterStore

  return (
    <Card className={classes.infoCard}>
      <div className={classes.infoDetails}>
        <Avatar>
          <TempIcon />
        </Avatar>
        <CardContent className={classes.deviceReading}>
          <Typography type="headline" component="h3">
            {`${selEnv().temperature}℃`}
          </Typography>
        </CardContent>
        <Avatar>
          <HumIcon />
        </Avatar>
        <CardContent className={classes.deviceReading}>
          <Typography type="headline" component="h3">
            {`${selEnv().humidity}%`}
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}

export default R.compose(
  withStyles(fermenterInfoStyles),
  withFermenterCtx
)(FermenterInfo)
