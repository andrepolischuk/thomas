'use strict'
const {app} = require('electron')
const createWindow = require('./createWindow')

require('electron-debug')()

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    app.hide()
  } else {
    app.quit()
  }
})
