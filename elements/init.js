'use strict'
const html = require('bel')
const {setConfig} = require('../modules/config')
const {start} = require('../modules/timer')

module.exports = function init (state, emit) {
  const {duration, breakDuration} = state.config

  return html`
    <article>
      <header>
        <div class="timer">
          <input
            class="input"
            type="number"
            value="${duration}"
            onchange=${event => emit(setConfig, {
              duration: parseInt(event.target.value, 10)
            })} />
          →
          <input
            class="input"
            type="number"
            value="${breakDuration}"
            onchange=${event => emit(setConfig, {
              breakDuration: parseInt(event.target.value, 10)
            })} />
        </div>
      </header>
      <footer>
        <button class="button button-submit" onclick=${() => emit(start)}>
          Start
        </button>
      </footer>
    </article>
  `
}
