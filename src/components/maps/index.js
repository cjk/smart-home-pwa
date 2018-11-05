// @flow
import type { Prefs, Rooms, AddressMap } from '../types'

import * as React from 'react'
import { withSmartHomeCtx } from '../../context/root'
import { withStyles } from '@material-ui/core/styles'
import { toggleAddrVal } from '../../lib/utils'

import { compose, has } from 'ramda'

import Light from './icons/light'

type Props = {
  smartHomeStore: any,
  // prefs: Prefs,
  // rooms: Rooms,
  classes: Object,
}

const styles = {
  furniture: {
    pointerEvents: 'none',
  },
  actorIcon: {
    pointerEvents: 'none',
  },
}

const Groundfloor = ({ smartHomeStore, classes }: Props) => {
  const { selLivestate, setKnxAddrVal }: { selLivestate: AddressMap } = smartHomeStore
  const livestate = selLivestate()

  const isOn = addr => (has(addr, livestate) ? livestate[addr].value : console.warn(`Address <${addr}> not found!`))
  const onLightSwitch = addrId => setKnxAddrVal(toggleAddrVal(livestate[addrId]))

  return (
    <svg
      id="SVGRoot"
      version="1.1"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid meet"
      onClick={e => onLightSwitch(e.target.id)}
    >
      <g stroke="#000" className={classes.furniture}>
        <path d="m290 30v90h-280v470.94h770v-470.94l-250 1.6002v-91.6z" fill="#fff" strokeWidth="1.0188" />
        <g fill="none" className={classes.furniture}>
          <path d="m10 470h210v120" strokeWidth=".723px" />
          <path d="m220 470v-180h-210" strokeWidth=".82158px" />
          <path d="m510 590v-270l-40-40h-50l-75 75 55 55 50-50 60 60" strokeWidth="1px" />
          <path d="m390 590v-50l120-120" strokeWidth="1px" />
        </g>
      </g>
      <g fill="#e9e9e9" stroke="#000">
        <rect
          x="600"
          y="290"
          width="110"
          height="220"
          strokeDasharray="0.14832843, 0.14832843000000001"
          strokeWidth=".59331"
          className={classes.furniture}
        />
        <g strokeDasharray="0.16125, 0.16125000000000000" strokeWidth=".645">
          <rect x="570" y="150" width="170" height="70" className={classes.furniture} />
          <rect x="40" y="470" width="80" height="60" className={classes.furniture} />
          <rect x="30" y="560" width="190" height="30" className={classes.furniture} />
          <circle opacity="0.10" cx="505.22" cy="274.66" r="25" />
        </g>
        <rect
          x="250"
          y="120"
          width="40"
          height="110"
          strokeDasharray="0.16912043, 0.16912042999999999"
          strokeWidth=".67648"
          className={classes.furniture}
        />
        <rect
          x="220"
          y="130"
          width="30"
          height="90"
          strokeDasharray="0.15834435, 0.15834434999999999"
          strokeWidth=".63338"
          className={classes.furniture}
        />
        <rect
          x="220"
          y="540"
          width="40"
          height="50"
          strokeDasharray="0.14720044, 0.14720043999999999"
          strokeWidth=".5888"
          className={classes.furniture}
        />
        <g strokeDasharray="0.16125, 0.16125000000000000" strokeWidth=".645">
          <rect x="550" y="560" width="230" height="30" />
          <rect x="510" y="320" width="40" height="270" />
          <rect x="10" y="260" width="210" height="30" />
        </g>
      </g>
      <g className="actors">
        <Light id="1/2/4" desc="Deckenleuchte Esszimmer" isOn={isOn('1/2/4')} className="actorIcon" x="650" y="180" />
        <Light id="1/2/1" desc="4er-Leuchte Küche" className="actorIcon" isOn={isOn('1/2/1')} x="645" y="320" />
        <Light id="1/2/7" desc="Deckenleuchten Küche" className="actorIcon" isOn={isOn('1/2/7')} x="550" y="430" />
        <Light id="1/2/13" desc="Wandlampen Wohnzimmer" className="actorIcon" isOn={isOn('1/2/13')} x="760" y="180" />
        <Light
          id="1/2/14"
          desc="Schrankleuchte Nordwand-Wohnzimmer"
          className="actorIcon"
          isOn={isOn('1/2/14')}
          x="100"
          y="265"
        />
        <Light
          id="1/2/3"
          desc=" Deckenleuchte Büro / Emma"
          className="actorIcon"
          isOn={isOn('1/2/3')}
          x="100"
          y="360"
        />
        <Light id="1/2/12" desc="Hängelampe Büro / Emma" className="actorIcon" isOn={isOn('1/2/12')} x="100" y="445" />
        <Light id="1/2/0" desc="Deckenleuchte Technik" className="actorIcon" isOn={isOn('1/2/0')} x="160" y="500" />
        <Light id="1/2/11" desc="Wandlampe Flur" className="actorIcon" isOn={isOn('1/2/11')} x="220" y="390" />
        <Light id="1/2/5" desc="Deckenleuchte Flur" className="actorIcon" isOn={isOn('1/2/5')} x="300" y="450" />
        <Light id="1/2/6" desc="Deckenleuchte Gäste-WC" className="actorIcon" isOn={isOn('1/2/6')} x="440" y="540" />
        <Light
          id="1/2/10"
          desc="Deckenleuchte Wohnzimmer Erker Ost"
          className="actorIcon"
          isOn={isOn('1/2/10')}
          x="110"
          y="180"
        />
        <Light
          id="1/2/15"
          desc="Deckenleuchte Wohnzimmer/Essen Mitte"
          className="actorIcon"
          isOn={isOn('1/2/15')}
          x="400"
          y="170"
        />
        <Light
          id="11/1/0"
          desc="Wohnzimmer Steckdose / Stehlampe Erker Rechts"
          className="actorIcon"
          isOn={isOn('11/1/0')}
          x="505"
          y="35"
        />
      </g>
    </svg>
  )
}

export default compose(
  withStyles(styles),
  withSmartHomeCtx
)(Groundfloor)
