import React from 'react'
import { SmartHomeContext } from './context/root'

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <SmartHomeContext.Provider>{element}</SmartHomeContext.Provider>
