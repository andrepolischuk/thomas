'use strict'
const {app} = require('electron')
const createWindow = require('./createWindow')

require('electron-debug')()

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})
