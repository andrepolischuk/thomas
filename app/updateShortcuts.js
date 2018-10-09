'use strict'
const localShortcut = require('electron-localshortcut')
const {globalShortcut} = require('electron')

let prevState = {}

module.exports = function updateShortcuts (window, state, callbacks) {
  const {keyboardEvents} = state

  if (!keyboardEvents && prevState.keyboardEvents) {
    globalShortcut.unregisterAll()
    localShortcut.unregisterAll(window)
    return
  }

  const {shortcuts} = state.settings
  const registeredShortcuts =
    (prevState.settings && prevState.settings.shortcuts) || {}

  Object.entries(shortcuts).forEach(([action, keys]) => {
    const fn = callbacks[action]
    const registeredKeys = registeredShortcuts[action]

    if (action === 'showWindow') {
      if (registeredKeys && globalShortcut.isRegistered(registeredKeys)) {
        globalShortcut.unregister(registeredKeys)
      }

      if (keyboardEvents && keys) {
        globalShortcut.register(keys, fn)
      }
    } else {
      if (
        registeredKeys &&
        localShortcut.isRegistered(window, registeredKeys)
      ) {
        localShortcut.unregister(window, registeredKeys)
      }

      if (keyboardEvents && keys) {
        localShortcut.register(window, keys, fn)
      }
    }
  })

  prevState = state
}
