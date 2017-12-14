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
  saveSettings(defaults)
}

function saveSettings (newSettings) {
  const nextSettings = Object.assign({}, settings.getAll())

  for (const key in newSettings) {
    nextSettings[key] = newSettings[key]
  }

  settings.setAll(nextSettings, {prettify: true})
}

exports.settings = settings
exports.saveSettings = saveSettings

exports.updateSettings = function updateSettings (settings, {state}) {
  return {
    settings: Object.assign({}, state.settings, settings)
  }
}
