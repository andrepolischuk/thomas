'use strict'
const morph = require('nanomorph')
const syncData = require('dact-electron')
const {ipcRenderer} = require('electron')
const main = require('./elements/main')
const {readLog, writeLog} = require('./utils/log')
const createData = require('../modules/createData')
const {mergeLog} = require('../modules/log')

const log = readLog()
const data = createData(syncData(ipcRenderer))

data.emit(mergeLog, log)

const body = document.querySelector('body')
let tree = body.appendChild(main(data.state, data.emit))

data.subscribe(() => {
  tree = morph(tree, main(data.state, data.emit))
})

data.subscribe('log', () => {
  writeLog(data.state.log)
})
