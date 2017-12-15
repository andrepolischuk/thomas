'use strict'

module.exports = function start ({state}) {
  return {
    timer: Object.assign({}, state.timer, {
      stage: 'interval',
      timeout: 1e3,
      prevTime: Date.now(),
      remainingTime: state.settings.duration * 60 * 1000
    }),
    location: 'timer'
  }
}
