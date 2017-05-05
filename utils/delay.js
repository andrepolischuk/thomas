'use strict'
const {ipcRenderer} = require('electron')

module.exports = function delay (timeout) {
  return new Promise(resolve => {
    ipcRenderer.once('setTimeout', resolve)
    ipcRenderer.send('setTimeout', timeout)
  })
}
