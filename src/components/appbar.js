// @flow

import * as React from 'react'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import MainIcon from '@material-ui/icons/Dashboard'
// import ConnIndicator from './ConnectionIndicator'
import { grey, indigo } from '@material-ui/core/colors'

import { compose } from 'ramda'

type AppBarProps = {
  conn: {
    state: string,
    error: string,
  },
  classes: Object,
}

const styles = {
  root: {
    position: 'relative',
    width: '100%',
    marginBottom: 65,
  },
  appBar: {
    backgroundColor: indigo[200],
  },
  homeButton: {
    // color: theme.palette.text.icon[500],
  },
  linkText: {
    color: grey[900],
  },
  flexFromHere: {
    flex: 1,
  },
}

const MainAppBar = (props: AppBarProps) => {
  const {
    classes,
    // conn: { state: connState, error: connErr },
  } = props

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton aria-label="Home" className={classes.homeButton}>
            <a className={classes.linkText}>
              <HomeIcon />
            </a>
          </IconButton>

          <IconButton aria-label="Main" className={classes.main}>
            <a className={classes.linkText}>
              <MainIcon />
            </a>
          </IconButton>

          <Button className={classes.flexFromHere}>
            <a className={classes.linkText}>Fermenter</a>
          </Button>

          {/* <ConnIndicator connState={connState} connErr={connErr} /> */}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default compose(
  withStyles(styles)
  // connect(state => ({ conn: state.app.connection }))
)(MainAppBar)
