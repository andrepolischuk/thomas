'use strict'
const init = require('./init')
const tick = require('./tick')
const finish = require('./finish')

const routes = {
  init,
  finish,
  break: tick,
  interval: tick
}

module.exports = function timer (state, emit) {
  const route = routes[state.timer.stage || 'init']

  return route(state, emit)
}
