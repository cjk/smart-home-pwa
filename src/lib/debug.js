// @flow

import logFactory from 'debug'

const LOG_PREFIX = 'smtHome'

function logger(namespace: string) {
  const debug = logFactory(`${LOG_PREFIX}:${namespace}`)
  debug.log = (...args) => console.log(...args)

  const error = logFactory(`${LOG_PREFIX}:${namespace}`)
  // error.log = (...args) => console.error(...args);

  return {
    debug,
    error,
  }
}

export { logger }
