'use strict'
const html = require('bel')
const start = require('../../modules/start')
const cancel = require('../../modules/cancel')

module.exports = function finish (state, emit) {
  return html`
    <article>
      <header>
        <h1>
          Hooray. All is done. You can start it again.
        </h1>
      </header>
      <footer>
        <button type="submit" onclick=${() => emit(start)}>
          Restart
        </button>
        <button onclick=${() => emit(cancel)}>
          Reset
        </button>
      </footer>
    </article>
  `
}
