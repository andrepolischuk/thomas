'use strict'
const html = require('bel')
const formatMs = require('../utils/formatMs')
const {stop} = require('../modules/timer')

module.exports = function timer (state, emit) {
  const {timerType, remainingTime} = state.timer

  return html`
    <article>
      <span>${timerType}</span>
      <h1>${formatMs(remainingTime)}</h1>
      <button type="reset" onclick=${() => emit(stop)}>
        Stop
      </button>
    </article>
  `
}
