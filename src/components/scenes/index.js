// @flow
import type { Scenes } from '../../types'

import * as React from 'react'
import * as R from 'ramda'
import SceneCard from './scenecard'
import { withSmartHomeCtx } from '../../context/root'

type Props = {
  smartHomeStore: any,
  classes: Object,
}

const SceneSelect = ({ smartHomeStore, classes }: Props) => {
  const { selScenes }: { selScenes: Scenes } = smartHomeStore
  const scenes = selScenes()
  // TODO:
  const onSceneAction = e => console.log(`Clicked theme ${e}`)

  return (
    <div className="scenesLst">
      {R.map(
        scene => (
          <SceneCard key={scene.id} scene={scene} onSceneAction={onSceneAction} />
        ),
        scenes
      )}
    </div>
  )
}

export default R.compose(withSmartHomeCtx)(SceneSelect)
