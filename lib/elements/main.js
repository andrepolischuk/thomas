'use strict'
const log = require('./log')
const init = require('./init')
const tick = require('./tick')
const finish = require('./finish')

const routes = {
  log,
  timer: {
    init,
    finish,
    break: tick,
    interval: tick
  }
}

module.exports = function main (state, emit) {
  let route = routes[state.location]

  if (typeof route === 'object') {
    route = route[state.timer.stage || 'init']
  }

  return route(state, emit)
}
