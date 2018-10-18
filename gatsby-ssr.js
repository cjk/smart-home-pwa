/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import wrapWithContext from './src/wrap-context-provider'

export const wrapRootElement = wrapWithContext
