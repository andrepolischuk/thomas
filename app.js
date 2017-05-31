'use strict'
const menubar = require('menubar')
const syncData = require('dact-electron')
const localShortcut = require('electron-localshortcut')
const {globalShortcut, ipcMain} = require('electron')
const trayIcon = require('./utils/trayIcon')
const createData = require('./modules/createData')
const {config, setConfig} = require('./modules/config')
const {start, startBreak, tick, cancel, finish} = require('./modules/timer')

require('electron-debug')()

const menu = menubar({
  preloadWindow: true,
  width: 300,
  height: 300,
  icon: trayIcon()
})

menu.on('after-create-window', () => {
  const data = createData(syncData(ipcMain, menu.window))
  const {shortcuts} = data.state.config
  let prevStage

  data.subscribe('timer', () => {
    const {stage, timeout} = data.state.timer

    setTimeout(() => {
      const {stage, remainingTime} = data.state.timer

      if (stage && remainingTime > 0) {
        data.emit(tick)
      }

      if (stage === 'interval' && remainingTime <= 0) {
        data.emit(startBreak)
        menu.showWindow()
      }

      if (stage === 'break' && remainingTime <= 0) {
        data.emit(finish)
        menu.showWindow()
      }
    }, timeout)

    if (prevStage !== stage) {
      prevStage = stage
      menu.tray.setImage(trayIcon(stage))
    }
  })

  data.subscribe('config', () => {
    config.set(data.state.config)
  })

  menu.on('show', () => {
    data.emit(setConfig, config.store)
  })

  if (process.platform === 'darwin') {
    menu.on('after-hide', () => {
      menu.app.hide()
    })
  }

  if (shortcuts.showWindow) {
    globalShortcut.register(shortcuts.showWindow, () => {
      menu.showWindow()
    })
  }

  if (shortcuts.hideWindow) {
    localShortcut.register(menu.window, shortcuts.hideWindow, () => {
      menu.hideWindow()
    })
  }

  if (shortcuts.startTimer) {
    localShortcut.register(menu.window, shortcuts.startTimer, () => {
      data.emit(data.state.timer.remainingTime > 0 ? cancel : start)
    })
  }
})

ipcMain.on('quit', () => {
  menu.app.quit()
})
