'use strict'
const Config = require('electron-config')
const {homedir} = require('os')

const configDir = homedir()

const appConfig = new Config({
  defaults: {
    interval: 25,
    breakInterval: 5
  },
  name: `${configDir}/.tom`
})

exports.config = appConfig

exports.pullConfig = function pullConfig ({state}) {
  return {
    config: Object.assign({}, state.config, appConfig.store)
  }
}
