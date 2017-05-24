'use strict'
const breakTip = require('../utils/breakTip')

const delay = 1000

exports.setTitle = function setTitle (title, {state}) {
  return {
    timer: Object.assign({}, state.timer, {title})
  }
}

exports.start = function start ({state}) {
  return {
    timer: Object.assign({}, state.timer, {
      stage: 'interval',
      timeout: delay,
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
      timeout: delay,
      prevTime: Date.now(),
      remainingTime: state.config.breakDuration * 60 * 1000
    }),
    location: 'timer',
    message: `Done. Break for a ${state.config.breakDuration} minutes. ${breakTip()}.`
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
      stage: 'finish',
      title: state.timer.title
    },
    log: state.log.concat({
      duration: state.config.duration,
      time: Date.now(),
      title: state.timer.title
    }),
    message: null,
    location: 'timer'
  }
}

exports.cancel = function cancel ({state}) {
  return {
    timer: {
      stage: '',
      title: state.timer.title
    },
    log: state.log.concat({
      duration: null,
      time: Date.now(),
      title: state.timer.title
    }),
    message: null
  }
}
