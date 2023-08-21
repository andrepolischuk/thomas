'use strict'
const {app, BrowserWindow, Menu} = require('electron')
const createWindow = require('./createWindow')
const menuTemplate = require('./menuTemplate')

app.setAppUserModelId('com.andrepolischuk.thomas')

require('electron-debug')()

let mainWindow

app.on('ready', () => {
  mainWindow = createWindow()

  // Função para trocar o idioma do menu
  const changeLanguage = newLanguage => {
    const template = menuTemplate(newLanguage, changeLanguage)

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    // Atualizar o idioma da janela principal (se necessário)
    // mainWindow.webContents.send('change-language', newLanguage)
  }

  // Construir o menu inicial com o idioma padrão (por exemplo, inglês)
  const initialTemplate = menuTemplate('en', changeLanguage)

  const menu = Menu.buildFromTemplate(initialTemplate)
  Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
  app.quit()
})
