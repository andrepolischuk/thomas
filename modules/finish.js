'use strict'

module.exports = function finish ({state}) {
  return {
    timer: {
      stage: 'finish'
    },
    log: state.log.concat({
      duration: state.settings.duration,
      time: Date.now()
    }),
    location: 'timer'
  }
}
