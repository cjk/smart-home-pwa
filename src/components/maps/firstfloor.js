// @flow

import * as React from 'react'
import Light from './icons/light'
import { withStyles } from '@material-ui/core/styles'

type Props = {
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

const Firstfloor = ({ classes, isOn, onLightSwitch }: Props) => {
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
          <path d="m10 360h210v230" strokeWidth="1.0009px" />
          <path d="m510 360h270" strokeWidth="1px" />
          <path d="m390 590v-50l120-100" strokeWidth="1px" />
          <path d="m410 30v190" strokeWidth=".78938px" />
          <path d="m510 440v-80" strokeWidth="1px" />
          <path d="m410 220-110 100" strokeWidth="1.0541px" />
          <path d="m510 360-34.286-40h-80l-45.714 40" strokeWidth="1.2344px" />
        </g>
        <g fill="#e9e9e9" stroke="#e9e9e9">
          <path d="m220 520h-40l-60 50v20" fillRule="evenodd" strokeWidth="1.0016" />
          <path
            d="m120.83 589.6c1.0733-0.9883 97.956-68.678 98.298-68.678 0.16966 0 0.30847 15.592 0.30847 34.648v34.648h-49.639c-28.396 0-49.351-0.26472-48.967-0.61857z"
            strokeWidth=".70822"
          />
          <ellipse cx="45.101" cy="569.19" rx="15" ry="20" strokeWidth="1.0016" />
        </g>
      </g>
      <g>
        <g fill="#e9e9e9" stroke="#000">
          <rect x="630" y="360" width="130" height="40" strokeDasharray="0.10659281, 0.10659281" strokeWidth=".42637" />
          <rect x="10" y="380" width="40" height="110" strokeDasharray="0.16912043, 0.16912043" strokeWidth=".67648" />
          <rect x="370" y="540" width="20" height="50" strokeDasharray="0.10408643, 0.10408643" strokeWidth=".41635" />
          <rect x="650" y="470" width="130" height="120" strokeDasharray="0.18462416, 0.18462416" strokeWidth=".7385" />
          <rect x="540" y="320" width="130" height="40" strokeDasharray="0.10659281, 0.10659281" strokeWidth=".42637" />
          <rect x="700" y="120" width="80" height="150" strokeDasharray="0.1619261, 0.1619261" strokeWidth=".6477" />
          <rect x="530" y="120" width="100" height="50" strokeDasharray="0.10452285, 0.10452285" strokeWidth=".41809" />
          <rect x="490" y="30" width="40" height="200" strokeDasharray="0.13221211, 0.13221211" strokeWidth=".52885" />
          <rect x="40" y="120" width="160" height="160" strokeDasharray="0.23650821, 0.23650821" strokeWidth=".94603" />
          <rect x="30" y="320" width="160" height="40" strokeDasharray="0.11825411, 0.11825411" strokeWidth=".47302" />
          <rect
            transform="matrix(.75092 -.66039 .75092 .66039 0 0)"
            x="-.10563"
            y="412.93"
            width="106.54"
            height="26.634"
            strokeDasharray="0.07873934, 0.07873934"
            strokeWidth=".31496"
          />
          <rect x="70" y="360" width="90" height="30" strokeDasharray="0.1324804, 0.1324804" strokeWidth=".52992" />
          <rect x="170" y="360" width="50" height="50" strokeDasharray="0.12747932, 0.12747932" strokeWidth=".50992" />
          <rect x="290" y="50" width="30" height="50" strokeDasharray="0.09874506, 0.09874506" strokeWidth=".39498" />
        </g>
        <path d="m10 520v-19.445h9.1924v38.891h-9.1924z" fill="#ff8080" stroke="#005" strokeWidth=".49976" />
      </g>
      <g className="actors">
        <Light
          id="1/3/12"
          desc="Deckenleuchte Nord Kind-1 / Schlafen"
          isOn={isOn('1/3/12')}
          className="actorIcon"
          x="110"
          y="290"
        />
        <Light
          id="1/3/0"
          desc="Deckenleuchte Süd Kind-1 / Schlafen"
          isOn={isOn('1/3/0')}
          className="actorIcon"
          x="340"
          y="140"
        />
        <Light id="1/3/1" desc="Deckenleuchte Kind-2 OG" isOn={isOn('1/3/1')} className="actorIcon" x="630" y="265" />
        <Light id="1/3/4" desc="Wandleuchte Flur OG" isOn={isOn('1/3/4')} className="actorIcon" x="460" y="440" />
        <Light
          id="1/3/10"
          desc="Wandleuchte Waschtisch Bad OG"
          isOn={isOn('1/3/10')}
          className="actorIcon"
          x="110"
          y="360"
        />
        <Light id="1/3/2" desc="Deckenleuchte Kind-3 OG" isOn={isOn('1/3/2')} className="actorIcon" x="630" y="440" />
        <Light id="1/3/3" desc="Deckenleuchte Bad OG" isOn={isOn('1/3/3')} className="actorIcon" x="110" y="500" />
      </g>
    </svg>
  )
}

export default withStyles(styles)(Firstfloor)
