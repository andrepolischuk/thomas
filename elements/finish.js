'use strict'
const html = require('bel')
const {start, cancel} = require('../modules/timer')

module.exports = function finish (state, emit) {
  return html`
    <article>
      <header>
        <h2>
          Hooray. All is done. You can start it again.
        </h2>
      </header>
      <footer>
        <button class="button button-submit" onclick=${() => emit(start)}>
          Restart
        </button>
        <button class="button" onclick=${() => emit(cancel)}>
          Reset
        </button>
      </footer>
    </article>
  `
}
