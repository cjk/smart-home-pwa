// @flow
import type { Crontab } from '../../types'

import * as React from 'react'
import * as R from 'ramda'

import Typography from '@material-ui/core/Typography'
import CronjobCard from './cronjobcard'

import { withSmartHomeCtx } from '../../context/root'

type Props = {
  smartHomeStore: any,
  classes: Object,
}

// Need some extra headroom because of the appbar above:
const style = { marginTop: '5em' }

const Cronjobs = ({ smartHomeStore }: Props) => {
  const { selCrontab }: { selCrontab: Crontab } = smartHomeStore
  const cronjobs = selCrontab()

  return (
    <div className="cronjobLst" style={style}>
      {R.isEmpty(cronjobs) ? (
        <Typography variant="h5">Still syncing ...</Typography>
      ) : (
        R.map(cronjob => <CronjobCard key={cronjob.jobId} cronjob={cronjob} />, R.values(cronjobs))
      )}
    </div>
  )
}

export default R.compose(withSmartHomeCtx)(Cronjobs)
