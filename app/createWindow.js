'use strict'
const syncData = require('dact-electron')
const {app, ipcMain, BrowserWindow, Menu, Tray} = require('electron')
const {join} = require('path')
const stageIcon = require('./stageIcon')
const menuTemplate = require('./menuTemplate')
const updateShortcuts = require('./updateShortcuts')
const createKeyboardCallbacks = require('./createKeyboardCallbacks')
const createData = require('../modules/createData')
const settings = require('../modules/settings')
const updateSettings = require('../modules/updateSettings')
const normalizeSettings = require('../modules/normalizeSettings')
const startBreak = require('../modules/startBreak')
const tick = require('../modules/tick')
const finish = require('../modules/finish')

module.exports = function createWindow () {
  const root = join(__dirname, '..')
  let tray
  let lastStage
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

  window.hideAll = () => {
    if (process.platform === 'darwin') {
      app.hide()
    } else {
      window.hide()
    }
  }

  const data = createData(syncData(ipcMain, window))
  const menu = Menu.buildFromTemplate(menuTemplate())
  const keyboardCallbacks = createKeyboardCallbacks(window, data)

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
          window.hideAll()
          clearTimeout(hideTimeout)
        }, 5000)
      }
    }, timeout)

    if (lastStage !== stage) {
      if (lastStage === 'interval') {
        window.setProgressBar(-1)
      }

      if (tray) {
        tray.setImage(stageIcon(stage))
      }

      lastStage = stage
    }
  })

  data.subscribe('settings', () => {
    const {stage} = data.state.timer
    const {trayIcon, progressBar} = data.state.settings

    settings.setAll(
      normalizeSettings(data.state.settings),
      {prettify: true}
    )

    if (!tray && trayIcon) {
      tray = new Tray(stageIcon(stage))

      tray.on('click', () => {
        window.show()
      })

      if (app.dock) {
        app.dock.hide()
      }
    } else if (tray) {
      tray.destroy()
      tray = null
      app.dock.show()
    }

    if (progressBar) {
      window.setProgressBar(-1)
    }

    updateShortcuts(window, data.state, keyboardCallbacks)
  })

  data.subscribe('keyboardEvents', () => {
    updateShortcuts(window, data.state, keyboardCallbacks)
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
}
