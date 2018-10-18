import React from 'react'
import RootContext from './context/root'

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => <RootContext.Provider>{element}</RootContext.Provider>
