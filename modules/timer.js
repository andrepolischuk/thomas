'use strict'

exports.start = function start ({state}) {
  return {
    timer: Object.assign({}, state.timer, {
      stage: 'interval',
      timeout: 1e3,
      prevTime: Date.now(),
      remainingTime: state.config.duration * 60 * 1000
    }),
    location: 'timer'
  }
}

exports.startBreak = function startBreak ({state}) {
  return {
    timer: Object.assign({}, state.timer, {
      stage: 'break',
      timeout: 1e3,
      prevTime: Date.now(),
      remainingTime: state.config.breakDuration * 60 * 1000
    }),
    location: 'timer'
  }
}

exports.tick = function tick ({state}) {
  if (!state.timer.timeout) {
    return
  }

  const currentTime = Date.now()
  const diff = state.timer.prevTime ? (currentTime - state.timer.prevTime) : 0

  let timeout = 1e3 - (diff % 1e3)

  if (timeout < (1e3 / 2.0)) {
    timeout += 1e3
  }

  const remainingTime = Math.max(state.timer.remainingTime - diff, 0)

  return {
    timer: Object.assign({}, state.timer, {
      timeout,
      remainingTime,
      prevTime: currentTime
    })
  }
}

exports.finish = function finish ({state}) {
  return {
    timer: {
      stage: 'finish'
    },
    log: state.log.concat({
      duration: state.config.duration,
      time: Date.now()
    }),
    location: 'timer'
  }
}

exports.cancel = function cancel ({state}) {
  return {
    timer: {
      stage: ''
    }
  }
}
