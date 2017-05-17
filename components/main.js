'use strict'
const html = require('bel')
const init = require('./init')
const timer = require('./timer')

module.exports = function main (state, emit) {
  const component = state.timer.timerType ? timer : init

  return html`
    <main>
      ${component(state, emit)}
    </main>
  `
}
