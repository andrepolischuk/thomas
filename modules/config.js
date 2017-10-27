'use strict'
const Config = require('electron-config')
const {homedir} = require('os')

const configDir = homedir()

const appConfig = new Config({
  defaults: {
    duration: 25,
    breakDuration: 5,
    shortcuts: {
      hideWindow: 'Escape',
      showWindow: 'CommandOrControl+Alt+T',
      startTimer: 'CommandOrControl+Enter'
    },
    trayIcon: true
  },
  name: `${configDir}/.thomas`
})

exports.config = appConfig

exports.setConfig = function setConfig (config, {state}) {
  return {
    config: Object.assign({}, state.config, config)
  }
}
