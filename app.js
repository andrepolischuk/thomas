'use strict'
const menubar = require('menubar')
const syncData = require('dact-electron')
const {globalShortcut, ipcMain} = require('electron')
const createData = require('./modules/createData')
const {config, pullConfig} = require('./modules/config')
const {startBreak, tick, stop} = require('./modules/timer')

require('electron-debug')()

const app = menubar({
  preloadWindow: true,
  width: 300,
  height: 300,
  icon: `${__dirname}/assets/trayIcon.png`
})

app.on('ready', () => {
  let prevTimerType
  const data = createData(syncData(ipcMain, app.window))

  data.subscribe('timer', () => {
    const {timerType, timeout, remainingTime} = data.state.timer

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

    if (prevTimerType !== timerType) {
      const iconPath = `${__dirname}/assets/tray${timerType.replace(/^\w/, m => m.toUpperCase())}Icon.png`
      prevTimerType = timerType
      app.tray.setImage(iconPath)
    }
  })

  data.subscribe('config', () => {
    config.set(data.state.config)
  })

  app.window.on('show', () => {
    data.emit(pullConfig)
  })

  globalShortcut.register('CommandOrControl+Alt+T', () => {
    app.showWindow()
  })
})

ipcMain.on('hideWindow', () => {
  app.app.hide()
})
