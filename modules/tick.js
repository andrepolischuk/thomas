'use strict'

module.exports = function tick ({state}) {
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
