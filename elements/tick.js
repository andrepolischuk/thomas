'use strict'
const html = require('bel')
const formatMs = require('../utils/formatMs')
const {cancel} = require('../modules/timer')

module.exports = function timer (state, emit) {
  const {stage, title, remainingTime} = state.timer

  return html`
    <article>
      <header>
        <h2>
          ${stage === 'interval' ? (title || 'Untitled') : state.message}
        </h2>
      </header>
      <div class="timer">
        ${formatMs(remainingTime)}
      </div>
      <footer>
        <button class="button button-reset" onclick=${() => emit(cancel)}>
          Cancel
        </button>
      </footer>
    </article>
  `
}
