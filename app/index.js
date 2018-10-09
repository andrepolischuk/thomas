'use strict'
const {app} = require('electron')
const createWindow = require('./createWindow')

app.setAppUserModelId('com.andrepolischuk.thomas')

require('electron-debug')()

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})
