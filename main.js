'use strict'
const html = require('bel')
const formatMs = require('./utils/formatMs')
const {start, stop} = require('./timer')

module.exports = function main ({timerType, timeout, remainingTime}, emit) {
  return html`
    <main>
      <span>${timerType || 'new interval'}</span>
      <h1>${timerType ? formatMs(remainingTime) : '25→5'}</h1>
      <button
        type="${timerType ? 'reset' : 'submit'}"
        onclick=${() => emit(timerType ? stop : start)}>
        ${timerType ? 'Stop' : 'Start'}
      </button>
    </main>
  `
}
