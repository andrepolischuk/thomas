'use strict'
const breakTip = require('../utils/breakTip')

const delay = 1000

exports.start = function start ({state}) {
  return {
    timer: {
      stage: 'work',
      timeout: delay,
      prevTime: Date.now(),
      remainingTime: state.config.interval * 60 * 1000
    },
    message: 'Work'
  }
}

exports.startBreak = function startBreak ({state}) {
  return {
    timer: {
      stage: 'break',
      timeout: delay,
      prevTime: Date.now(),
      remainingTime: state.config.breakInterval * 60 * 1000
    },
    message: `Done. Break for a ${state.config.breakInterval} minutes. ${breakTip()}.`
  }
}

exports.tick = function tick ({state}) {
  if (!state.timer.timeout) {
    return
  }

  const currentTime = Date.now()
  const diff = state.timer.prevTime ? (currentTime - state.timer.prevTime) : 0

  let timeout = delay - (diff % delay)

  if (timeout < (delay / 2.0)) {
    timeout += delay
  }

  const remainingTime = Math.max(state.timer.remainingTime - diff, 0)

  return {
    timer: {
      timeout,
      remainingTime,
      prevTime: currentTime,
      stage: state.timer.stage
    }
  }
}

exports.finish = function finish () {
  return {
    timer: {
      stage: 'finish'
    },
    message: null
  }
}

exports.stop = function stop () {
  return {
    timer: {
      stage: ''
    },
    message: null
  }
}
