'use strict'
const {homedir} = require('os')
const settings = require('electron-settings')

const defaults = {
  duration: 25,
  breakDuration: 5,
  shortcuts: {
    hideWindow: 'Escape',
    showWindow: 'CommandOrControl+Alt+T',
    startTimer: 'CommandOrControl+Enter'
  },
  trayIcon: false,
  progressBar: false
}

settings.setPath(`${homedir()}/.thomas.json`)

if (!settings.has('duration')) {
  settings.setAll(defaults, {prettify: true})
}

exports.settings = settings

exports.updateSettings = function updateSettings (settings, {state}) {
  return {
    settings: Object.assign({}, state.settings, settings)
  }
}
