'use strict'
const html = require('bel')
const {start} = require('../../modules/timer')
const {setConfig} = require('../../modules/config')

module.exports = function init (state, emit) {
  const {duration, breakDuration} = state.config

  return html`
    <main>
      <div class="timer">
        <input
          type="number"
          value="${duration}"
          onchange=${event => emit(setConfig, {
            duration: parseInt(event.target.value, 10)
          })} />
        <small>→</small>
        <input
          type="number"
          value="${breakDuration}"
          onchange=${event => emit(setConfig, {
            breakDuration: parseInt(event.target.value, 10)
          })} />
      </div>
      <footer>
        <button type="submit" onclick=${() => emit(start)}>
          Start
        </button>
      </footer>
    </main>
  `
}
