'use strict'
const menubar = require('menubar')
const syncData = require('dact-electron')
const {globalShortcut, ipcMain} = require('electron')
const createData = require('./modules/createData')
const {config, setConfig} = require('./modules/config')
const {startBreak, tick, stop} = require('./modules/timer')

require('electron-debug')()

const menu = menubar({
  preloadWindow: true,
  width: 300,
  height: 300,
  icon: `${__dirname}/assets/trayIcon.png`
})

menu.on('after-create-window', () => {
  let prevTimerType
  const data = createData(syncData(ipcMain, menu.window))

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
      menu.tray.setImage(iconPath)
    }
  })

  data.subscribe('config', () => {
    config.set(data.state.config)
  })

  globalShortcut.register('CommandOrControl+Alt+T', () => {
    menu.showWindow()
  })

  menu.on('show', () => {
    data.emit(setConfig, config.store)
  })

  if (process.platform === 'darwin') {
    menu.on('after-hide', () => {
      menu.app.hide()
    })
  }
})

ipcMain.on('hideWindow', () => {
  menu.hideWindow()
})

ipcMain.on('quit', () => {
  menu.app.quit()
})
