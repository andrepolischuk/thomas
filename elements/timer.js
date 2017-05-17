'use strict'
const html = require('bel')
const formatMs = require('../utils/formatMs')
const {stop} = require('../modules/timer')

module.exports = function timer (state, emit) {
  const {timerType, remainingTime} = state.timer

  return html`
    <article>
      <h2>${timerType}</h2>
      <div class="timer">
        ${formatMs(remainingTime)}
      </div>
      <button class="button button-reset" onclick=${() => emit(stop)}>
        Stop
      </button>
    </article>
  `
}
