'use strict'
const breakTip = require('../utils/breakTip')

const delay = 1000

exports.setTitle = function setTitle (title, {state}) {
  return {
    timer: {
      title,
      stage: state.timer.stage
    }
  }
}

exports.start = function start ({state}) {
  return {
    timer: {
      stage: 'work',
      timeout: delay,
      prevTime: Date.now(),
      title: state.timer.title,
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
      title: state.timer.title,
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
      title: state.timer.title,
      stage: state.timer.stage
    }
  }
}

exports.finish = function finish ({state}) {
  return {
    timer: {
      stage: 'finish',
      title: state.timer.title
    },
    log: state.log.concat({
      completed: true,
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
      completed: false,
      time: Date.now(),
      title: state.timer.title
    }),
    message: null
  }
}
