'use strict'
const menubar = require('menubar')
const createData = require('dact')
const {globalShortcut, ipcMain} = require('electron')
const {initial, start, startBreak, tick, stop} = require('./timer')

require('electron-debug')()

const app = menubar({
  preloadWindow: true,
  width: 300,
  height: 300,
  icon: `${__dirname}/assets/trayIcon.png`
})

const data = createData(initial)

app.on('ready', () => {
  globalShortcut.register('CommandOrControl+Alt+T', () => {
    app.showWindow()
  })
})

ipcMain.on('hideWindow', () => {
  app.app.hide()
})

ipcMain.on('startTimer', () => {
  data.emit(start)
})

ipcMain.on('stopTimer', () => {
  data.emit(stop)
})

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

    app.window.webContents.send('notify', 'Done', 'Break for a 5 minutes')
  }

  if (timerType === 'break' && remainingTime <= 0) {
    setTimeout(() => {
      data.emit(stop)
    }, timeout)

    app.window.webContents.send('notify', 'All done', 'Click for start next interval', 'startTimer')
  }

  app.window.webContents.send('render', data.state)
})

data.subscribe('timerType', () => {
  const timerType = data.state.timerType || ''
  const icon = `${__dirname}/assets/tray${timerType.replace(/^\w/, m => m.toUpperCase())}Icon.png`

  app.tray.setImage(icon)
})
