'use strict'
const morph = require('nanomorph')
const createData = require('dact')
const {ipcRenderer} = require('electron')
const main = require('./main')
const {initial, start, stop} = require('./timer')

const data = createData(initial)
const root = document.getElementById('root')
let tree = root.appendChild(main(data))

data.subscribe(() => {
  tree = morph(tree, main(data))
})

data.subscribe('timerType', () => {
  const {timerType} = data.state

  ipcRenderer.send('updateTrayIcon', timerType || '')
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
