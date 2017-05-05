'use strict'
const menubar = require('menubar')
const {globalShortcut, ipcMain} = require('electron')

require('electron-debug')()

const app = menubar({
  preloadWindow: true,
  width: 300,
  height: 300,
  icon: `${__dirname}/assets/trayIcon.png`
})

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+Alt+T', () => {
    app.showWindow()
  })
})

ipcMain.on('hideWindow', () => {
  app.app.hide()
})

ipcMain.on('updateTrayIcon', (event, timerType) => {
  const icon = `${__dirname}/assets/tray${timerType.replace(/^\w/, m => m.toUpperCase())}Icon.png`

  app.tray.setImage(icon)
})

ipcMain.on('setTimeout', (event, timeout) => {
  setTimeout(() => {
    event.sender.send('setTimeout')
  }, timeout)
})
