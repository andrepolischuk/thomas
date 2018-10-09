'use strict'
const html = require('bel')
const start = require('../../modules/start')
const updateSettings = require('../../modules/updateSettings')

module.exports = function init (state, emit) {
  const {duration, breakDuration} = state.settings

  return html`
    <article>
      <div class="timer">
        <input
          type="number"
          value="${duration}"
          onchange=${event =>
            emit(updateSettings, {
              duration: parseInt(event.target.value, 10)
            })} />
        <small>→</small>
        <input
          type="number"
          value="${breakDuration}"
          onchange=${event =>
            emit(updateSettings, {
              breakDuration: parseInt(event.target.value, 10)
            })} />
      </div>
      <footer>
        <button type="submit" onclick=${() => emit(start)}>
          Start
        </button>
      </footer>
    </article>
  `
}
