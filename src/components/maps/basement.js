// @flow

import * as React from 'react'
import Light from './icons/light'
import MotionDetector from './icons/motion-detector'
import { withStyles } from '@material-ui/core/styles'

type Props = {
  classes: Object,
  isOn: (addr: string) => string,
  onLightSwitch: addr => void,
}

const styles = {
  furniture: {
    pointerEvents: 'none',
  },
  actorIcon: {
    pointerEvents: 'none',
  },
}

const Basement = ({ classes, isOn, onLightSwitch }: Props) => {
  return (
    <svg
      id="SVGRoot"
      version="1.1"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid meet"
      onClick={e => onLightSwitch(e.target.id)}
    >
      <g>
        <path
          d="m290 30v90h-280v470.94h770v-470.94l-250 1.6002v-91.6z"
          fill="#fff"
          stroke="#000"
          strokeWidth="1.0188"
        />
        <g fill="none" stroke="#000">
          <path d="m510 360h270" strokeWidth="1px" />
          <path d="m390 590v-50l120-100" strokeWidth="1px" />
          <path d="m410 30v220" strokeWidth=".84941px" />
          <path d="m510 440v-80" strokeWidth="1px" />
          <path d="m510 360-34.286-40h-80l-45.714 40" strokeWidth="1.2344px" />
        </g>
        <ellipse cx="230" cy="150" rx="20" ry="10" fill="#ff8080" stroke="#005" strokeWidth=".70677" />
        <circle cx="59.544" cy="241.67" r="35" fill="#e9e9e9" stroke="#005" strokeWidth=".70677" />
        <path d="m10 360h280" fill="none" stroke="#000" strokeWidth="1px" />
      </g>
      <g stroke="#000">
        <g fill="#e9e9e9">
          <rect x="660" y="360" width="110" height="40" strokeDasharray="0.09805112, 0.09805112" strokeWidth=".3922" />
          <rect x="110" y="450" width="80" height="120" strokeDasharray="0.24980744, 0.24980744" strokeWidth=".99923" />
          <rect x="370" y="540" width="20" height="50" strokeDasharray="0.10408643, 0.10408643" strokeWidth=".41635" />
          <rect x="590" y="550" width="190" height="40" strokeDasharray="0.12886442, 0.12886442" strokeWidth=".51546" />
          <rect x="540" y="320" width="190" height="40" strokeDasharray="0.12886442, 0.12886442" strokeWidth=".51546" />
          <rect x="530" y="120" width="250" height="40" strokeDasharray="0.14781763, 0.14781763" strokeWidth=".59127" />
          <rect x="420" y="30" width="100" height="30" strokeDasharray="0.08096305, 0.08096305" strokeWidth=".32385" />
          <rect x="40" y="120" width="240" height="60" strokeDasharray="0.17738116, 0.17738116" strokeWidth=".70952" />
          <rect x="160" y="310" width="50" height="50" strokeDasharray="0.07390882, 0.07390882" strokeWidth=".29564" />
          <rect x="10" y="360" width="50" height="40" strokeDasharray="0.11402097, 0.11402097" strokeWidth=".45608" />
          <rect x="20" y="530" width="50" height="50" strokeDasharray="0.12747932, 0.12747932" strokeWidth=".50992" />
          <rect x="320" y="50" width="70" height="60" strokeDasharray="0.16523209, 0.16523209" strokeWidth=".66093" />
        </g>
        <path d="m350 360 50 60" fill="none" strokeWidth="1px" />
        <g fill="#e9e9e9">
          <rect x="410" y="80" width="30" height="160" strokeDasharray="0.10241106, 0.10241106" strokeWidth=".40964" />
          <rect x="740" y="190" width="40" height="110" strokeDasharray="0.09805113, 0.09805113" strokeWidth=".3922" />
          <rect
            transform="matrix(.77917 -.62682 .68291 .7305 0 0)"
            x="130.47"
            y="541.74"
            width="10.763"
            height="58.573"
            strokeDasharray="0.03711453, 0.03711453"
            strokeWidth=".14846"
          />
        </g>
        <path d="m410 320v-20" fill="none" strokeWidth="1px" />
        <g fill="#e9e9e9">
          <rect x="530" y="160" width="40" height="110" strokeDasharray="0.09805113, 0.09805113" strokeWidth=".3922" />
          <rect x="20" y="290" width="60" height="60" strokeDasharray="0.08869058, 0.08869058" strokeWidth=".35476" />
          <rect x="90" y="330" width="70" height="30" strokeDasharray="0.06773856, 0.06773856" strokeWidth=".27095" />
          <rect
            transform="rotate(50.325)"
            x="663.59"
            y="-95.763"
            width="50"
            height="40"
            strokeDasharray="0.06610605, 0.06610605"
            strokeWidth=".26442"
          />
        </g>
        <g className="actorIcon">
          <Light
            id="1/1/5"
            desc="Deckenleuchte Hobbyraum UG"
            isOn={isOn('1/1/5')}
            className="actorIcon"
            x="240"
            y="490"
          />
          <Light id="1/1/5" desc="Deckenleuchte Flur UG" isOn={isOn('1/1/5')} className="actorIcon" x="450" y="410" />
          <Light id="1/1/9" desc="Deckenleuchte Keller-1" isOn={isOn('1/1/9')} className="actorIcon" x="180" y="220" />
          <Light id="1/1/6" desc="Deckenleuchte Keller-2" isOn={isOn('1/1/6')} className="actorIcon" x="590" y="250" />
          <Light id="1/1/7" desc="Deckenleuchte Keller-3" isOn={isOn('1/1/7')} className="actorIcon" x="575" y="390" />
          <MotionDetector
            id="TODO_13/2/0"
            desc="Präsenzmelder Keller-1"
            isOn={isOn('13/2/0')}
            className="actorIcon"
            x="200"
            y="430"
          />
        </g>
      </g>
    </svg>
  )
}

export default withStyles(styles)(Basement)
