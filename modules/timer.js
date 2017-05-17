'use strict'
const delay = 1000

exports.start = function start ({state}) {
  return {
    timer: {
      timerType: 'work',
      timeout: delay,
      prevTime: Date.now(),
      remainingTime: state.config.interval * 60 * 1000
    }
  }
}

exports.startBreak = function startBreak ({state}) {
  return {
    timer: {
      timerType: 'break',
      timeout: delay,
      prevTime: Date.now(),
      remainingTime: state.config.breakInterval * 60 * 1000
    }
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
      timerType: state.timer.timerType
    }
  }
}

exports.stop = function stop () {
  return {
    timer: {
      timerType: ''
    }
  }
}
