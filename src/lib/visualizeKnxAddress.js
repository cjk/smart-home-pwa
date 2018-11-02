/* @flow */

import type { KnxAddress } from '../types'
import * as React from 'react'

import { blue } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'

import Avatar from '@material-ui/core/Avatar'
import LightBulbOnIcon from '@material-ui/icons/WbIncandescent'
import InhibutIcon from '@material-ui/icons/Block'
import ShutterIcon from '@material-ui/icons/ViewHeadline'
import PowerIcon from '@material-ui/icons/Power'
import SceneIcon from '@material-ui/icons/BurstMode'
import NotifyOnIcon from '@material-ui/icons/NotificationsActive'
import NotifyOffIcon from '@material-ui/icons/NotificationsNone'
import LuxIcon from '@material-ui/icons/Exposure'
import HeatingIcon from '@material-ui/icons/HotTub'

type Props = {
  addr: KnxAddress,
  classes: Object,
}

const addressStyles = {
  isOn: {
    margin: 10,
    color: '#fff',
    backgroundColor: blue[500],
  },
  isOff: {
    margin: 10,
    color: '#fff',
  },
}

function visualizedAddress(props) {
  const { addr, classes }: Props = props

  switch (addr.func) {
    case 'light': {
      const IconOn = LightBulbOnIcon
      const IconOff = LightBulbOnIcon

      return (
        <Avatar className={addr.value ? classes.isOn : classes.isOff}>{addr.value ? <IconOn /> : <IconOff />}</Avatar>
      )
    }

    case 'shut': {
      const IconOn = ShutterIcon
      const IconOff = ShutterIcon

      return (
        <Avatar className={addr.value ? classes.isOn : classes.isOff}>{addr.value ? <IconOn /> : <IconOff />}</Avatar>
      )
    }

    case 'scene': {
      const IconOn = SceneIcon
      const IconOff = SceneIcon

      return (
        <Avatar className={addr.value ? classes.isOn : classes.isOff}>{addr.value ? <IconOn /> : <IconOff />}</Avatar>
      )
    }

    case 'contact': {
      const IconOn = NotifyOnIcon
      const IconOff = NotifyOffIcon

      return (
        <Avatar className={addr.value ? classes.isOn : classes.isOff}>{addr.value ? <IconOn /> : <IconOff />}</Avatar>
      )
    }

    case 'inhibit': {
      const IconOn = InhibutIcon
      const IconOff = InhibutIcon

      return (
        <Avatar className={addr.value ? classes.isOn : classes.isOff}>{addr.value ? <IconOn /> : <IconOff />}</Avatar>
      )
    }

    case 'lux': {
      const IconOn = LuxIcon
      const IconOff = LuxIcon

      return (
        <Avatar className={addr.value ? classes.isOn : classes.isOff}>{addr.value ? <IconOn /> : <IconOff />}</Avatar>
      )
    }

    case 'heat': {
      const IconOn = HeatingIcon
      const IconOff = HeatingIcon

      return (
        <Avatar className={addr.value ? classes.isOn : classes.isOff}>{addr.value ? <IconOn /> : <IconOff />}</Avatar>
      )
    }

    default: {
      // When in doubt, also check the address-type to distinguish further
      switch (addr.type) {
        case 'outlet': {
          const IconOn = PowerIcon
          const IconOff = PowerIcon

          return (
            <Avatar className={addr.value ? classes.isOn : classes.isOff}>
              {addr.value ? <IconOn /> : <IconOff />}
            </Avatar>
          )
        }
        default: {
          return <Avatar className={addr.value ? classes.isOn : classes.isOff}>?</Avatar>
        }
      }
    }
  }
}

export default withStyles(addressStyles)(visualizedAddress)
