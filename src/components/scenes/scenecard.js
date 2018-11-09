/* @flow */

// Presentational-component to visualize a scene

import type { Scene } from '../../types'

import * as React from 'react'
import * as R from 'ramda'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

type Props = {
  scene: Scene,
  onSceneAction: Function,
  classes: Object,
}

const sceneStyles = theme => ({
  card: {
    margin: '2em',
    maxWidth: 275,
    minWidth: 275,
  },
  sceneName: {
    marginBottom: 5,
  },
  sceneInfo: {
    marginBottom: 5,
    color: theme.palette.text.secondary,
  },
})

const SceneCard = ({ scene, onSceneAction, classes }: Props) => (
  <div className="sceneCard">
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h3" className={classes.sceneName}>
          {scene.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={() => onSceneAction(scene.id)}>
          On
        </Button>
        <Button color="primary" onClick={() => onSceneAction(scene.id, false)}>
          Off
        </Button>
      </CardActions>
    </Card>
  </div>
)

export default R.compose(withStyles(sceneStyles))(SceneCard)
