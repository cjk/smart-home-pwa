// @flow

import * as React from 'react'

import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import MainIcon from '@material-ui/icons/Dashboard'
import ScenesIcon from '@material-ui/icons/WallpaperOutlined'
import CrontabIcon from '@material-ui/icons/WatchLaterOutlined'
import OnlineIcon from '@material-ui/icons/CloudDoneOutlined'
import OfflineIcon from '@material-ui/icons/CloudOffOutlined'
import { grey, indigo } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'

import { Link } from 'gatsby'
import { compose } from 'ramda'

import { useOffline } from '../lib/hooks'

type AppBarProps = {
  conn: {
    state: string,
    error: string,
  },
  classes: Object,
}

const styles = theme => ({
  root: {
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
  grow: {
    flex: 1,
  },
  fermenterButton: {
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 50,
      width: 'auto',
    },
  },
})

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
            <Link to="/" className={classes.linkText}>
              <HomeIcon />
            </Link>
          </IconButton>

          <IconButton aria-label="Maps" className={classes.main}>
            <Link to="/map" className={classes.linkText}>
              <MainIcon />
            </Link>
          </IconButton>

          <IconButton aria-label="Scenes" className={classes.main}>
            <Link to="/scenes" className={classes.linkText}>
              <ScenesIcon />
            </Link>
          </IconButton>

          <IconButton aria-label="Crontab" className={classes.main}>
            <Link to="/crontab" className={classes.linkText}>
              <CrontabIcon />
            </Link>
          </IconButton>

          <Button className={classes.fermenterButton}>
            <Link to="/fermenter" className={classes.linkText}>
              Fermenter
            </Link>
          </Button>

          <div className={classes.grow} />

          {/* Show connection information */}
          <div>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {useOffline() ? <OfflineIcon /> : <OnlineIcon />}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default compose(
  withStyles(styles)
  // connect(state => ({ conn: state.app.connection }))
)(MainAppBar)
