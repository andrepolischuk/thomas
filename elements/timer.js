'use strict'
const html = require('bel')
const formatMs = require('../utils/formatMs')
const {stop} = require('../modules/timer')

module.exports = function timer (state, emit) {
  return html`
    <article>
      <h2>${state.message}</h2>
      <div class="timer">
        ${formatMs(state.timer.remainingTime)}
      </div>
      <footer>
        <button class="button button-reset" onclick=${() => emit(stop)}>
          Stop
        </button>
      </footer>
    </article>
  `
}
