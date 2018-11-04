// @flow

import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import orange from '@material-ui/core/colors/orange'

import { compose } from 'ramda'

import LightIconOff from '@material-ui/icons/WbIncandescent'
import LightIconOn from '@material-ui/icons/WbIridescent'

type Props = {
  id: string,
  desc: string,
  isOn: boolean,
  x: number,
  y: number,
  classes: Object,
}

const LightIconStyles = {
  container: {
    position: 'absolute',
  },
  iconBox: {},
  icon: {
    overflow: 'visible',
    pointerEvents: 'none',
  },
}

const Light = ({ id, desc, x, y, isOn, classes }: Props) => (
  <svg
    version="1.1"
    x={x}
    y={y}
    className={classes.container}
    viewBox="0 0 800 600"
    preserveAspectRatio="xMidYMid meet"
  >
    <circle
      id={id}
      className={classes.iconBox}
      r="30"
      opacity="0"
      strokeDasharray="5.15905512, 1.28976378, 0.64488189, 1.28976378"
      strokeWidth=".64488"
    />

    {isOn ? (
      <LightIconOn className={classes.icon} color={isOn ? 'secondary' : 'inherit'} width="20" height="20" />
    ) : (
      <LightIconOff className={classes.icon} color={isOn ? 'secondary' : 'inherit'} width="20" height="20" />
    )}

    <desc>{desc}</desc>
  </svg>
)

export default compose(withStyles(LightIconStyles))(Light)
