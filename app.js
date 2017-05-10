'use strict'
const menubar = require('menubar')
const createData = require('dact')
const sync = require('dact-electron')
const {globalShortcut, ipcMain} = require('electron')
const {initial, startBreak, tick, stop} = require('./timer')

require('electron-debug')()

const app = menubar({
  preloadWindow: true,
  width: 300,
  height: 300,
  icon: `${__dirname}/assets/trayIcon.png`
})

app.on('ready', () => {
  const data = createData(initial, sync(ipcMain, app.window))

  data.subscribe(() => {
    const {timerType, timeout, remainingTime} = data.state

    if (timerType && remainingTime > 0) {
      setTimeout(() => {
        data.emit(tick)
      }, timeout)
    }

    if (timerType === 'work' && remainingTime <= 0) {
      setTimeout(() => {
        data.emit(startBreak)
      }, timeout)
    }

    if (timerType === 'break' && remainingTime <= 0) {
      setTimeout(() => {
        data.emit(stop)
      }, timeout)
    }
  })

  data.subscribe('timerType', () => {
    const timerType = data.state.timerType || ''
    const icon = `${__dirname}/assets/tray${timerType.replace(/^\w/, m => m.toUpperCase())}Icon.png`

    app.tray.setImage(icon)
  })

  globalShortcut.register('CommandOrControl+Alt+T', () => {
    app.showWindow()
  })
})

ipcMain.on('hideWindow', () => {
  app.app.hide()
})
