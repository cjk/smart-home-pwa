// @flow

import * as React from 'react'
import * as R from 'ramda'

import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import HeaterIcon from '@material-ui/icons/AcUnit'
import HumidifierIcon from '@material-ui/icons/Cloud'
import { green, grey } from '@material-ui/core/colors'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

type Props = {
  name: string,
  isOn: boolean,
  shouldSwitchTo: string,
  willSwitch: boolean,
  lastSwitchAt: number,
}

const FermenterDevice = ({ name, isOn, lastSwitchAt }: Props) => {
  const lastSwitchDate = `switched ${isOn ? 'on' : 'off'} ${distanceInWordsToNow(lastSwitchAt)} ago`

  const colorByState = isOn => ({
    color: '#fff',
    background: isOn ? green[500] : grey[500],
  })

  return (
    <Card>
      <CardContent>
        <Avatar style={colorByState(isOn)}>{name === 'heater' ? <HeaterIcon /> : <HumidifierIcon />}</Avatar>
        <Typography style={{ marginTop: 10 }} component="p" color="textSecondary" variant="caption" align="justify">
          {R.isNil(lastSwitchAt) ? '' : lastSwitchDate}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default FermenterDevice
