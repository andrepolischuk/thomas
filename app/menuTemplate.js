'use strict'
const {app, shell} = require('electron')

module.exports = function menuTemplate (language = 'en', onChangeLanguage) {
  const labels = {
    en: {
      services: 'Services',
      hide: 'Hide',
      hideOthers: 'Hide Others',
      showAll: 'Show All',
      quit: 'Quit',
      undo: 'Undo',
      redo: 'Redo',
      cut: 'Cut',
      copy: 'Copy',
      paste: 'Paste',
      selectAll: 'Select All',
      view: 'View',
      edit: 'Edit',
      reload: 'Reload',
      toggleDevTools: 'Toggle Developer Tools',
      minimize: 'Minimize',
      close: 'Close',
      help: 'Help',
      viewOnGitHub: 'View on GitHub'
    },
    pt: {
      services: 'Serviços',
      hide: 'Ocultar',
      hideOthers: 'Ocultar Outros',
      showAll: 'Mostrar Todos',
      quit: 'Sair',
      undo: 'Desfazer',
      redo: 'Refazer',
      cut: 'Recortar',
      copy: 'Copiar',
      paste: 'Colar',
      selectAll: 'Selecionar Tudo',
      view: 'Visualizar',
      edit: 'Editar',
      reload: 'Recarregar',
      toggleDevTools: 'Alternar Ferramentas de Desenvolvimento',
      minimize: 'Minimizar',
      close: 'Fechar',
      help: 'Ajuda',
      viewOnGitHub: 'Ver no GitHub'
    },
    it: {
      services: 'Servizi',
      hide: 'Nascondi',
      hideOthers: 'Nascondi Altri',
      showAll: 'Mostra Tutto',
      quit: 'Esci',
      undo: 'Annulla',
      redo: 'Ripeti',
      cut: 'Taglia',
      copy: 'Copia',
      paste: 'Incolla',
      selectAll: 'Seleziona Tutto',
      view: 'Visualizza',
      edit: 'Modifica',
      reload: 'Ricarica',
      toggleDevTools: 'Attiva Strumenti di Sviluppo',
      minimize: 'Minimizza',
      close: 'Chiudi',
      help: 'Aiuto',
      viewOnGitHub: 'Visualizza su GitHub'
    },
    fr: {
      services: 'Services',
      hide: 'Cacher',
      hideOthers: 'Cacher les autres',
      showAll: 'Tout afficher',
      quit: 'Quitter',
      undo: 'Annuler',
      redo: 'Rétablir',
      cut: 'Couper',
      copy: 'Copier',
      paste: 'Coller',
      selectAll: 'Sélectionner tout',
      view: 'Vue',
      edit: 'Modifier',
      reload: 'Recharger',
      toggleDevTools: 'Basculer les outils de développement',
      minimize: 'Réduire',
      close: 'Fermer',
      help: 'Aide',
      viewOnGitHub: 'Voir sur GitHub'
    }
  }

  const currentLabels = labels[language] || labels['en']

  const servicesSubMenu = [
    {
      label: currentLabels.services,
      role: 'services',
      submenu: [
        {
          label: 'English',
          type: 'checkbox',
          checked: language === 'en',
          click () {
            onChangeLanguage('en')
          }
        },
        {
          label: 'Português',
          type: 'checkbox',
          checked: language === 'pt',
          click () {
            onChangeLanguage('pt')
          }
        },
        {
          label: 'Italian',
          type: 'checkbox',
          checked: language === 'it',
          click () {
            onChangeLanguage('it')
          }
        },
        {
          label: 'French',
          type: 'checkbox',
          checked: language === 'fr',
          click () {
            onChangeLanguage('fr')
          }
        }
      ]
    }
  ]

  return [
    {
      label: 'Thomas',
      submenu: [
        ...servicesSubMenu,
        {
          type: 'separator'
        },
        {
          label: `${currentLabels.hide} Thomas`,
          accelerator: 'Command+H',
          role: 'hide'
        },
        {
          label: currentLabels.hideOthers,
          accelerator: 'Alt+Command+H',
          role: 'hideothers'
        },
        {
          label: currentLabels.showAll,
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: currentLabels.quit,
          accelerator: 'Command+Q',
          click () {
            app.quit()
          }
        }
      ]
    },
    {
      label: currentLabels.edit,
      submenu: [
        {
          label: currentLabels.undo,
          accelerator: 'CommandOrControl+Z',
          role: 'undo'
        },
        {
          label: currentLabels.redo,
          accelerator: 'Shift+CommandOrControl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: currentLabels.cut,
          accelerator: 'CommandOrControl+X',
          role: 'cut'
        },
        {
          label: currentLabels.copy,
          accelerator: 'CommandOrControl+C',
          role: 'copy'
        },
        {
          label: currentLabels.paste,
          accelerator: 'CommandOrControl+V',
          role: 'paste'
        },
        {
          label: currentLabels.selectAll,
          accelerator: 'CommandOrControl+A',
          role: 'selectall'
        }
      ]
    },
    {
      label: currentLabels.view,
      submenu: [
        {
          label: currentLabels.reload,
          accelerator: 'CommandOrControl+R',
          click (_item, window) {
            if (window) {
              window.reload()
            }
          }
        },
        {
          label: currentLabels.toggleDevTools,
          accelerator: 'Alt+Command+I',
          click (_item, window) {
            if (window) {
              window.webContents.toggleDevTools()
            }
          }
        }
      ]
    },
    {
      label: currentLabels.window,
      role: 'window',
      submenu: [
        {
          label: currentLabels.minimize,
          accelerator: 'CommandOrControl+M',
          role: 'minimize'
        },
        {
          label: currentLabels.close,
          accelerator: 'CommandOrControl+W',
          role: 'close'
        }
      ]
    },
    {
      label: currentLabels.help,
      role: 'help',
      submenu: [
        {
          label: currentLabels.viewOnGitHub,
          click () {
            shell.openExternal('http://github.com/andrepolischuk/thomas')
          }
        }
      ]
    }
  ]
}
