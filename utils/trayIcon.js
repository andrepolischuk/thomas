'use strict'
const {join} = require('path')

module.exports = function trayIcon (stage = '') {
  const iconName = stage === 'finish' ? '' : stage.replace(/^\w/, m => m.toUpperCase())

  return join(__dirname, '..', `assets/tray${iconName}Template.png`)
}
