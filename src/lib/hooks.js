// @flow

import { useState, useEffect } from 'react'

// A custom react hook to signal app-online + offline state using react-hooks
function useOffline() {
  const [isOffline, setIsOffline] = useState(false)

  function onOffline() {
    setIsOffline(true)
  }

  function onOnline() {
    setIsOffline(false)
  }

  useEffect(() => {
    window.addEventListener('offline', onOffline)
    window.addEventListener('online', onOnline)

    return () => {
      window.removeEventListener('offline', onOffline)
      window.removeEventListener('online', onOnline)
    }
  }, [])

  return isOffline
}

// Custom hook to update + display current connection information
function useConnection() {
  const conn = typeof window === 'undefined' ? null : window.navigator.connection
  const [getConnection, setConnection] = useState('??')

  function onConnectionChange() {
    if (!conn) return

    const indicator =
      typeof window.navigator.connection.type === 'undefined'
        ? window.navigator.connection.effectiveType
        : window.navigator.connection.type
    setConnection(indicator)
  }

  useEffect(() => {
    conn.addEventListener('change', onConnectionChange)

    return () => {
      conn.removeEventListener('change', onConnectionChange)
    }
  }, [])

  return getConnection
}

// Custom hook to update + display current connection information
// Give an action-parameter if you want to execute some logic / side-effects when the App becomes visible / hidden.
function useVisibility(action) {
  const docVisible = typeof window === 'undefined' ? null : document.visibilityState
  const [getVisibility, setVisibility] = useState(docVisible)

  function onVisChange() {
    if (!docVisible) return

    if (action) action(document.visibilityState)
    setVisibility(document.visibilityState)
  }

  useEffect(() => {
    window.addEventListener('visibilitychange', onVisChange)

    return () => {
      window.removeEventListener('visibilitychange', onVisChange)
    }
  }, [])

  return getVisibility
}

export { useOffline, useConnection, useVisibility }
