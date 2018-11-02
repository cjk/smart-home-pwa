// @flow

/* Presentational component for a list of switched-on lights */

import type { KnxAddress, Prefs, Rooms } from '../types'

import * as React from 'react'
import * as R from 'ramda'
import VisualizedAddress from '../lib/visualizeKnxAddress'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

type Props = {
  addresses: Array<KnxAddress>,
  prefs: Prefs,
  rooms: Rooms,
  onLightSwitch: Function,
  classes: Object,
}

const addrListStyles = theme => ({
  root: {
    margin: 50,
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  title: {
    padding: 20,
  },
  addrList: {
    background: theme.palette.background.paper,
    textAlign: 'auto',
  },
})

const maxShownItems = 6

const addrItemLst = R.curry((onLightSwitch, addresses) =>
  R.map(addr => (
    <ListItem key={addr.id} onClick={() => onLightSwitch(addr)} dense button>
      <VisualizedAddress addr={addr} />
      <ListItemText primary={addr.name} secondary={`${distanceInWordsToNow(addr.updatedAt)} ago`} />
    </ListItem>
  ))(addresses)
)

const LightsList = ({ addresses, classes, onLightSwitch }: Props) => {
  const addrItems = R.compose(
    addrItemLst(onLightSwitch),
    R.take(maxShownItems),
    R.sort((a, b) => a.updatedAt - b.updatedAt),
    R.values
  )(addresses)

  const skippedAddressCount = Math.max(0, R.length(R.values(addresses)) - maxShownItems)

  return (
    <Paper className={classes.root}>
      <Typography type="body1" className={classes.title}>
        Remaining lights
      </Typography>
      <List className={classes.addrList}>
        {R.isEmpty(addrItems) ? (
          <ListItem>
            <ListItemText inset className={classes.listItemText} primary="----" />
          </ListItem>
        ) : (
          addrItems
        )}
        {skippedAddressCount > 0 ? (
          <ListItem>
            <ListItemText secondary={`${skippedAddressCount} more skipped`} />
          </ListItem>
        ) : (
          <span />
        )}
      </List>
    </Paper>
  )
}

export default R.compose(withStyles(addrListStyles))(LightsList)
