'use strict'
const {app, shell} = require('electron')
const {updateSettings} = require('../modules/settings')

module.exports = function menuTemplate (data) {
  return [
    {
      label: 'Thomas',
      submenu: [
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide Thomas',
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Alt+Command+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click () {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CommandOrControl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CommandOrControl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CommandOrControl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CommandOrControl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CommandOrControl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CommandOrControl+A',
          role: 'selectall'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CommandOrControl+R',
          click (item, window) {
            if (window) {
              window.reload()
            }
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Command+I',
          click (item, window) {
            if (window) {
              window.webContents.toggleDevTools()
            }
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Tray icon',
          click () {
            data.emit(updateSettings, {
              trayIcon: !data.state.settings.trayIcon
            })
          },
          type: 'checkbox',
          checked: data.state.settings.trayIcon
        },
        {
          label: 'Progress bar',
          click (item, window) {
            data.emit(updateSettings, {
              progressBar: !data.state.settings.progressBar
            })
          },
          type: 'checkbox',
          checked: data.state.settings.progressBar
        }
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CommandOrControl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CommandOrControl+W',
          role: 'close'
        }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'View on GitHub',
          click () {
            shell.openExternal('http://github.com/andrepolischuk/thomas')
          }
        }
      ]
    }
  ]
}
