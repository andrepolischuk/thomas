'use strict'
const html = require('bel')
const {setConfig} = require('../modules/config')
const {start, setTitle} = require('../modules/timer')

module.exports = function init (state, emit) {
  const {title} = state.timer
  const {duration, breakDuration} = state.config

  return html`
    <article>
      <h2>
        <input
          class="input input-title"
          type="text"
          value="${title}"
          placeholder="Type title..."
          onchange=${event => emit(setTitle, event.target.value)}/>
      </h2>
      <div class="timer">
        <input
          class="input input-timer"
          type="number"
          value="${duration}"
          onchange=${event => emit(setConfig, {
            duration: event.target.value
          })} />
        →
        <input
          class="input input-timer"
          type="number"
          value="${breakDuration}"
          onchange=${event => emit(setConfig, {
            breakDuration: event.target.value
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
