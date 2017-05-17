'use strict'
const morph = require('nanomorph')
const syncData = require('dact-electron')
const {ipcRenderer} = require('electron')
const main = require('./elements/main')
const notify = require('./utils/notify')
const breakTip = require('./utils/breakTip')
const createData = require('./modules/createData')
const {start, stop} = require('./modules/timer')

const data = createData(syncData(ipcRenderer))
const root = document.getElementById('root')
let tree = root.appendChild(main(data.state, data.emit))

data.subscribe(() => {
  const {breakInterval} = data.state.config
  const {timerType, remainingTime} = data.state.timer

  if (timerType === 'work' && remainingTime <= 0) {
    notify('Done', `Break for a ${breakInterval} minutes. ${breakTip()}.`)
  }

  if (timerType === 'break' && remainingTime <= 0) {
    notify('All done', 'Click for start next interval.').then(() => {
      data.emit(start)
    })
  }

  tree = morph(tree, main(data.state, data.emit))
})

document.addEventListener('keydown', event => {
  if (event.key === 's') {
    data.emit(start)
  }

  if (event.key === 'S') {
    data.emit(stop)
  }

  if (event.key === 'Escape') {
    ipcRenderer.send('hideWindow')
  }
})
