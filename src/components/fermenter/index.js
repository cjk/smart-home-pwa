// @flow

import * as R from 'ramda'
import React, { useEffect } from 'react'

import FermenterInfo from './fermenter-info'
import FermenterControl from './fermenter-control'

import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { withFermenterCtx } from '../../context/root'

type Props = {
  fermenterStore: any,
  classes: any,
}

const styles = {
  fermenterRoot: {
    marginTop: '5em',
    padding: 20,
  },
}

const FermenterIndex = ({ fermenterStore, classes }: Props) => {
  const { startFermenterData, stopFermenterData } = fermenterStore

  useEffect(
    () => {
      startFermenterData()
      return () => {
        stopFermenterData()
      }
    },
    [1]
  )

  return (
    <Paper className={classes.fermenterRoot}>
      <FermenterInfo />
      <FermenterControl />
    </Paper>
  )
}

export default R.compose(
  withStyles(styles),
  withFermenterCtx
)(FermenterIndex)
