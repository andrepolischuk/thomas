'use strict'
const syncData = require('dact-electron')
const localShortcut = require('electron-localshortcut')
const {globalShortcut, ipcMain, BrowserWindow, Menu, Tray} = require('electron')
const {join} = require('path')
const stageIcon = require('./stageIcon')
const menuTemplate = require('./menuTemplate')
const createData = require('../modules/createData')
const {config, setConfig} = require('../modules/config')
const {start, startBreak, tick, cancel, finish} = require('../modules/timer')

module.exports = function createWindow () {
  const root = join(__dirname, '..')
  let tray
  let prevStage
  let hideTimeout

  let window = new BrowserWindow({
    width: 300,
    height: 300,
    icon: `file://${root}/assets/icon.png`,
    show: false,
    resizable: false,
    fullscreenable: false,
    backgroundColor: '#ffffff',
    title: 'Thomas',
    titleBarStyle: 'hidden-inset'
  })

  window.loadURL(`file://${root}/lib/index.html`)

  const data = createData(syncData(ipcMain, window))
  const {shortcuts} = data.state.config
  const menu = Menu.buildFromTemplate(menuTemplate(data))

  Menu.setApplicationMenu(menu)

  data.subscribe('timer', () => {
    const {stage, timeout} = data.state.timer

    setTimeout(() => {
      const {stage, remainingTime} = data.state.timer

      if (remainingTime > 0 && stage) {
        data.emit(tick)
      }

      if (remainingTime <= 0 && (stage === 'interval' || stage === 'break')) {
        data.emit(stage === 'interval' ? startBreak : finish)
        window.showInactive()

        hideTimeout = setTimeout(() => {
          window.hide()
          clearTimeout(hideTimeout)
        }, 4000)
      }
    }, timeout)

    if (tray && prevStage !== stage) {
      prevStage = stage
      tray.setImage(stageIcon(stage))
    }
  })

  data.subscribe('config', () => {
    const {stage} = data.state.timer
    const {trayIcon} = data.state.config

    config.set(data.state.config)

    if (trayIcon === !!tray) {
      return
    }

    if (trayIcon) {
      tray = new Tray(stageIcon(stage))

      tray.on('click', () => {
        window.show()
      })
    } else {
      tray.destroy()
      tray = null
    }
  })

  window.once('ready-to-show', () => {
    window.show()
  })

  window.on('focus', () => {
    clearTimeout(hideTimeout)
  })

  window.on('show', () => {
    data.emit(setConfig, config.store)
  })

  window.on('closed', () => {
    window = null
  })

  if (shortcuts.showWindow) {
    globalShortcut.register(shortcuts.showWindow, () => {
      window.show()
    })
  }

  if (shortcuts.hideWindow) {
    localShortcut.register(window, shortcuts.hideWindow, () => {
      window.hide()
    })
  }

  if (shortcuts.startTimer) {
    localShortcut.register(window, shortcuts.startTimer, () => {
      data.emit(data.state.timer.remainingTime > 0 ? cancel : start)
    })
  }
}
