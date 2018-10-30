// @flow

/* eslint-disable react/prop-types, react/no-danger */
import React from 'react'
import { renderToString } from 'react-dom/server'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from './src/mui/getPageContext'

import wrapWithContext from './src/wrap-context-provider'

export const wrapRootElement = wrapWithContext

// Enable MaterialUI SSR support - see the note / issue below for a simpler way in the future!
// Source: https://github.com/mui-org/material-ui/tree/master/examples/gatsby
// TODO: CjK 19.10.2018 - there seems to be no difference in HTML returned from the server with or without this code!?
function replaceRenderer({ bodyComponent, replaceBodyHTMLString, setHeadComponents }) {
  // Get the context of the page to collected side effects.
  const muiPageContext = getPageContext()

  const bodyHTML = renderToString(<JssProvider registry={muiPageContext.sheetsRegistry}>{bodyComponent}</JssProvider>)

  replaceBodyHTMLString(bodyHTML)
  setHeadComponents([
    <style
      type="text/css"
      id="jss-server-side"
      key="jss-server-side"
      dangerouslySetInnerHTML={{ __html: muiPageContext.sheetsRegistry.toString() }}
    />,
  ])
}

export default replaceRenderer

// It's not ready yet: https://github.com/gatsbyjs/gatsby/issues/8237.
//
// const withRoot = require('./src/withRoot').default;
// const WithRoot = withRoot(props => props.children);

// exports.wrapRootElement = ({ element }) => {
//   return <WithRoot>{element}</WithRoot>;
// };
