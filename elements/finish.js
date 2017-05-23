'use strict'
const html = require('bel')
const {start, stop} = require('../modules/timer')

module.exports = function finish (state, emit) {
  return html`
    <article>
      <h2>Hooray. ${state.timer.title || 'All'} is done. You can start it again.</h2>
      <footer>
        <button class="button button-submit" onclick=${() => emit(start)}>
          Restart
        </button>
        <button class="button" onclick=${() => emit(stop)}>
          Reset
        </button>
      </footer>
    </article>
  `
}
