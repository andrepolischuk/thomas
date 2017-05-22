'use strict'
const morph = require('nanomorph')
const syncData = require('dact-electron')
const {ipcRenderer} = require('electron')
const main = require('./elements/main')
const {writeLog} = require('./utils/log')
const createData = require('./modules/createData')
const {start, stop} = require('./modules/timer')

const data = createData(syncData(ipcRenderer))
const body = document.querySelector('body')
let tree = body.appendChild(main(data.state, data.emit))

data.subscribe(() => {
  tree = morph(tree, main(data.state, data.emit))
})

data.subscribe('log', () => {
  writeLog(data.state.log)
})

document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    data.emit(data.state.timer.remainingTime > 0 ? stop : start)
  }

  if (event.key === 'Escape') {
    ipcRenderer.send('hideWindow')
  }
})
