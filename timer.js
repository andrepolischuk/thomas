'use strict'
const TIMEOUT = 1000
const WORK_INTERVAL = 25 * 60 * 1000
const BREAK_INTERVAL = 5 * 60 * 1000

const initial = {
  timerType: null,
  timeout: null,
  prevTime: null,
  remainingTime: null
}

exports.initial = initial

exports.start = function start () {
  return {
    timerType: 'work',
    timeout: TIMEOUT,
    prevTime: Date.now(),
    remainingTime: WORK_INTERVAL
  }
}

exports.startBreak = function startBreak () {
  return {
    timerType: 'break',
    timeout: TIMEOUT,
    prevTime: Date.now(),
    remainingTime: BREAK_INTERVAL
  }
}

exports.tick = function tick ({state}) {
  if (!state.timeout) {
    return
  }

  const currentTime = Date.now()
  const diff = state.prevTime ? (currentTime - state.prevTime) : 0

  let timeout = TIMEOUT - (diff % TIMEOUT)

  if (timeout < (TIMEOUT / 2.0)) {
    timeout += TIMEOUT
  }

  const remainingTime = Math.max(state.remainingTime - diff, 0)

  return {
    timeout,
    remainingTime,
    prevTime: currentTime
  }
}

exports.stop = function stop () {
  return initial
}
