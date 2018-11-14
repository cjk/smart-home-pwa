// @flow
import type { Scenes } from '../../types'

import * as React from 'react'
import * as R from 'ramda'

import Typography from '@material-ui/core/Typography'
import SceneCard from './scenecard'

import { withSmartHomeCtx } from '../../context/root'

type Props = {
  smartHomeStore: any,
  classes: Object,
}

// Need some extra headroom because of the appbar above:
const style = { marginTop: '5em' }

const SceneSelect = ({ smartHomeStore }: Props) => {
  const { selScenes, activateScene }: { selScenes: Scenes, activateScene: Function } = smartHomeStore
  const scenes = selScenes()

  const onSceneAction = (sceneId, activate = true) => activateScene({ sceneId, activate })

  return (
    <div className="scenesLst" style={style}>
      {R.isEmpty(scenes) ? (
        <Typography variant="h5">Still syncing scenes ...</Typography>
      ) : (
        R.map(scene => <SceneCard key={scene.id} scene={scene} onSceneAction={onSceneAction} />, R.values(scenes))
      )}
    </div>
  )
}

export default R.compose(withSmartHomeCtx)(SceneSelect)
