'use strict'
const html = require('bel')
const formatMs = require('../utils/formatMs')
const {stop} = require('../modules/timer')

module.exports = function timer (state, emit) {
  const {stage, title, remainingTime} = state.timer

  return html`
    <article>
      <h2>${stage === 'work' ? (title || 'Untitled') : state.message}</h2>
      <div class="timer">
        ${formatMs(remainingTime)}
      </div>
      <footer>
        <button class="button button-reset" onclick=${() => emit(stop)}>
          Stop
        </button>
      </footer>
    </article>
  `
}
