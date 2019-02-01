'use strict'
const morph = require('nanomorph')
const url = require('url')
const syncData = require('dact-electron')
const {ipcRenderer} = require('electron')
const main = require('./elements/main')
const {readLog, writeLog} = require('./utils/log')
const applySettings = require('./utils/applySettings')
const mergeLog = require('../modules/mergeLog')
const createData = require('../modules/createData')

const log = readLog()
const data = createData(syncData(ipcRenderer))

data.emit(mergeLog, log)
applySettings(url.parse(window.location.href, true).query)

const body = document.querySelector('body')
let tree = body.appendChild(main(data.state, data.emit))

data.subscribe(() => {
  tree = morph(tree, main(data.state, data.emit))
})

data.subscribe('log', () => {
  writeLog(data.state.log)
})

ipcRenderer.on('settings:update', (event, settings) => {
  applySettings(settings)
})
