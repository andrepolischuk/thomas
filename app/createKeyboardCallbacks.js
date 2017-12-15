'use strict'
const start = require('../modules/start')
const cancel = require('../modules/cancel')

module.exports = function createKeyboardCallbacks (window, data) {
  function showWindow () {
    window.show()
  }

  function hideWindow () {
    window.hideAll()
  }

  function startTimer () {
    data.emit(data.state.timer.remainingTime > 0 ? cancel : start)
  }

  return {
    showWindow,
    hideWindow,
    startTimer
  }
}
