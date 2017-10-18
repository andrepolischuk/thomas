'use strict'
const syncData = require('dact-electron')
const localShortcut = require('electron-localshortcut')
const {app, globalShortcut, ipcMain, BrowserWindow, Tray} = require('electron')
const createTrayIcon = require('./utils/trayIcon')
const createData = require('./modules/createData')
const {config, setConfig} = require('./modules/config')
const {start, startBreak, tick, cancel, finish} = require('./modules/timer')

require('electron-debug')()

app.on('ready', () => {
  let tray
  let prevStage
  let hideTimeout

  let mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    icon: `file://${__dirname}/assets/icon.png`,
    show: false,
    resizable: false,
    fullscreenable: false,
    backgroundColor: '#ffffff',
    title: 'Thomas',
    titleBarStyle: 'hidden-inset'
  })

  const data = createData(syncData(ipcMain, mainWindow))
  const {shortcuts, trayIcon} = data.state.config

  mainWindow.loadURL(`file://${__dirname}/index.html`)

  if (trayIcon) {
    tray = new Tray(createTrayIcon())
  }

  data.subscribe('timer', () => {
    const {stage, timeout} = data.state.timer

    setTimeout(() => {
      const {stage, remainingTime} = data.state.timer

      if (remainingTime > 0 && stage) {
        data.emit(tick)
      }

      if (remainingTime <= 0 && (stage === 'interval' || stage === 'break')) {
        data.emit(stage === 'interval' ? startBreak : finish)
        mainWindow.showInactive()

        hideTimeout = setTimeout(() => {
          mainWindow.hide()
          clearTimeout(hideTimeout)
        }, 4000)
      }
    }, timeout)

    if (tray && prevStage !== stage) {
      prevStage = stage
      tray.setImage(createTrayIcon(stage))
    }
  })

  data.subscribe('config', () => {
    config.set(data.state.config)
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('focus', () => {
    clearTimeout(hideTimeout)
  })

  mainWindow.on('show', () => {
    data.emit(setConfig, config.store)
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (process.platform === 'darwin') {
    mainWindow.on('hide', () => {
      app.hide()
    })
  }

  if (tray) {
    tray.on('click', () => {
      mainWindow.show()
    })
  }

  if (shortcuts.showWindow) {
    globalShortcut.register(shortcuts.showWindow, () => {
      mainWindow.show()
    })
  }

  if (shortcuts.hideWindow) {
    localShortcut.register(mainWindow, shortcuts.hideWindow, () => {
      mainWindow.hide()
    })
  }

  if (shortcuts.startTimer) {
    localShortcut.register(mainWindow, shortcuts.startTimer, () => {
      data.emit(data.state.timer.remainingTime > 0 ? cancel : start)
    })
  }
})

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    app.hide()
  } else {
    app.quit()
  }
})

ipcMain.on('quit', () => {
  app.quit()
})
