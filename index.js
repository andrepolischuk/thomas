'use strict'
const morph = require('nanomorph')
const {ipcRenderer} = require('electron')
const main = require('./main')
const notify = require('./utils/notify')
const {initial} = require('./timer')

const root = document.getElementById('root')
let tree = root.appendChild(main(initial))

ipcRenderer.on('render', (event, state) => {
  tree = morph(tree, main(state))
})

ipcRenderer.on('notify', (event, title, body, action) => {
  const notification = notify(title, body)

  if (action) {
    notification.then(() => {
      event.sender.send(action)
    })
  }
})

document.addEventListener('keydown', event => {
  if (event.key === 's') {
    ipcRenderer.send('startTimer')
  }

  if (event.key === 'S') {
    ipcRenderer.send('stopTimer')
  }

  if (event.key === 'Escape') {
    ipcRenderer.send('hideWindow')
  }
})
