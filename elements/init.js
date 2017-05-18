'use strict'
const html = require('bel')
const {start} = require('../modules/timer')
const {setConfig} = require('../modules/config')

module.exports = function init (state, emit) {
  const {interval, breakInterval} = state.config

  return html`
    <article>
      <h2>New interval</h2>
      <div class="timer">
        <input
          class="input input-timer"
          type="number"
          value="${interval}"
          onchange=${event => emit(setConfig, {
            interval: event.target.value
          })} />
        →
        <input
          class="input input-timer"
          type="number"
          value="${breakInterval}"
          onchange=${event => emit(setConfig, {
            breakInterval: event.target.value
          })} />
      </div>
      <footer>
        <button class="button button-submit" onclick=${() => emit(start)}>
          Start
        </button>
      </footer>
    </article>
  `
}
