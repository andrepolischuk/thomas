'use strict'
const delayInterval = 1000
const workInterval = 25 * 60 * 1000
const breakInterval = 5 * 60 * 1000

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
    timeout: delayInterval,
    prevTime: Date.now(),
    remainingTime: workInterval
  }
}

exports.startBreak = function startBreak () {
  return {
    timerType: 'break',
    timeout: delayInterval,
    prevTime: Date.now(),
    remainingTime: breakInterval
  }
}

exports.tick = function tick ({state}) {
  if (!state.timeout) {
    return
  }

  const currentTime = Date.now()
  const diff = state.prevTime ? (currentTime - state.prevTime) : 0

  let timeout = delayInterval - (diff % delayInterval)

  if (timeout < (delayInterval / 2.0)) {
    timeout += delayInterval
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
