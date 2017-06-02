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
  let hideTimeout

  data.subscribe('timer', () => {
    const {stage, timeout} = data.state.timer

    setTimeout(() => {
      const {stage, remainingTime} = data.state.timer

      if (remainingTime > 0 && stage) {
        data.emit(tick)
      }

      if (remainingTime <= 0 && (stage === 'interval' || stage === 'break')) {
        data.emit(stage === 'interval' ? startBreak : finish)
        menu.window.showInactive()

        hideTimeout = setTimeout(() => {
          menu.hideWindow()
          clearTimeout(hideTimeout)
        }, 4000)
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

  menu.window.on('focus', () => {
    clearTimeout(hideTimeout)
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
