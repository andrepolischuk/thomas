'use strict'

module.exports = function startBreak ({state}) {
  return {
    timer: Object.assign({}, state.timer, {
      stage: 'break',
      timeout: 1e3,
      prevTime: Date.now(),
      remainingTime: state.settings.breakDuration * 60 * 1000
    }),
    location: 'timer'
  }
}
