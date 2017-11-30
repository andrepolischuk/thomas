'use strict'
const syncData = require('dact-electron')
const localShortcut = require('electron-localshortcut')
const {app, globalShortcut, ipcMain, BrowserWindow, Menu, Tray} = require('electron')
const {join} = require('path')
const stageIcon = require('./stageIcon')
const menuTemplate = require('./menuTemplate')
const createData = require('../modules/createData')
const {settings, updateSettings} = require('../modules/settings')
const {start, startBreak, tick, cancel, finish} = require('../modules/timer')

module.exports = function createWindow () {
  const cache = {}
  const root = join(__dirname, '..')
  let tray
  let hideTimeout

  const window = new BrowserWindow({
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
  const {shortcuts} = data.state.settings
  const menu = Menu.buildFromTemplate(menuTemplate(data))

  const hideWindow = () => {
    if (process.platform === 'darwin') {
      app.hide()
    } else {
      window.hide()
    }
  }

  Menu.setApplicationMenu(menu)

  data.subscribe('timer', () => {
    const {stage, timeout} = data.state.timer

    setTimeout(() => {
      const {progressBar} = data.state.settings
      const {stage, remainingTime} = data.state.timer

      if (remainingTime > 0 && stage) {
        data.emit(tick)
      }

      if (remainingTime > 0 && stage === 'interval' && progressBar) {
        window.setProgressBar(1 - (remainingTime / data.state.settings.duration / 6e4))
      }

      if (remainingTime <= 0 && (stage === 'interval' || stage === 'break')) {
        data.emit(stage === 'interval' ? startBreak : finish)
        window.showInactive()

        hideTimeout = setTimeout(() => {
          hideWindow()
          clearTimeout(hideTimeout)
        }, 5000)
      }
    }, timeout)

    if (cache.stage !== stage) {
      if (cache.stage === 'interval') {
        window.setProgressBar(-1)
      }

      if (tray) {
        tray.setImage(stageIcon(stage))
      }

      cache.stage = stage
    }
  })

  data.subscribe('settings', () => {
    const {stage} = data.state.timer
    const {trayIcon, progressBar} = data.state.settings

    settings.setAll(data.state.settings, {prettify: true})

    if (trayIcon === !tray) {
      if (trayIcon) {
        tray = new Tray(stageIcon(stage))

        tray.on('click', () => {
          window.show()
        })

        if (app.dock) {
          app.dock.hide()
        }
      } else {
        tray.destroy()
        tray = null
        app.dock.show()
      }
    }

    if (progressBar !== cache.progressBar) {
      if (!progressBar) {
        window.setProgressBar(-1)
      }

      cache.progressBar = progressBar
    }
  })

  window.once('ready-to-show', () => {
    window.show()
  })

  window.on('focus', () => {
    clearTimeout(hideTimeout)
  })

  window.on('show', () => {
    data.emit(updateSettings, settings.getAll())
  })

  if (shortcuts.showWindow) {
    globalShortcut.register(shortcuts.showWindow, () => {
      window.show()
    })
  }

  if (shortcuts.hideWindow) {
    localShortcut.register(window, shortcuts.hideWindow, () => {
      hideWindow()
    })
  }

  if (shortcuts.startTimer) {
    localShortcut.register(window, shortcuts.startTimer, () => {
      data.emit(data.state.timer.remainingTime > 0 ? cancel : start)
    })
  }
}
