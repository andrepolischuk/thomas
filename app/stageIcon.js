'use strict'
const {join} = require('path')

module.exports = function stageIcon (stage = '') {
  const iconName =
    stage === 'finish' ? '' : stage.replace(/^\w/, m => m.toUpperCase())

  return join(__dirname, `static/tray${iconName}Template.png`)
}
