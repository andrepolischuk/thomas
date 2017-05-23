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
      stage: 'work',
      timeout: delay,
      prevTime: Date.now(),
      remainingTime: state.config.interval * 60 * 1000
    })
  }
}

exports.startBreak = function startBreak ({state}) {
  return {
    timer: Object.assign({}, state.timer, {
      stage: 'break',
      timeout: delay,
      prevTime: Date.now(),
      remainingTime: state.config.breakInterval * 60 * 1000
    }),
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
      duration: state.config.interval,
      time: Date.now(),
      title: state.timer.title
    }),
    message: null
  }
}

exports.stop = function stop ({state}) {
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
