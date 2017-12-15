'use strict'
const {homedir} = require('os')
const settings = require('electron-settings')
const defaults = require('./defaults')

settings.setPath(`${homedir()}/.thomas.json`)

if (!settings.has('duration')) {
  settings.setAll(defaults, {prettify: true})
}

module.exports = settings
