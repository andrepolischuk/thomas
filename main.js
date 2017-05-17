'use strict'
const html = require('bel')
const formatMs = require('./utils/formatMs')
const {start, stop} = require('./modules/timer')

module.exports = function main (state, emit) {
  const {interval, breakInterval} = state.config
  const {timerType, remainingTime} = state.timer

  return html`
    <main>
      <span>${timerType || 'new interval'}</span>
      <h1>${timerType ? formatMs(remainingTime) : `${interval}→${breakInterval}`}</h1>
      <button
        type="${timerType ? 'reset' : 'submit'}"
        onclick=${() => emit(timerType ? stop : start)}>
        ${timerType ? 'Stop' : 'Start'}
      </button>
    </main>
  `
}
