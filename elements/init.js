'use strict'
const html = require('bel')
const {setConfig} = require('../modules/config')
const {start, setTitle} = require('../modules/timer')

module.exports = function init (state, emit) {
  const {title} = state.timer
  const {duration, breakDuration} = state.config

  return html`
    <article>
      <header>
        <input
          class="input input-title"
          type="text"
          value="${title}"
          placeholder="Type title..."
          onchange=${event => emit(setTitle, event.target.value)}/>
      </header>
      <div class="timer">
        <input
          class="input input-timer"
          type="number"
          value="${duration}"
          onchange=${event => emit(setConfig, {
            duration: parseInt(event.target.value, 10)
          })} />
        →
        <input
          class="input input-timer"
          type="number"
          value="${breakDuration}"
          onchange=${event => emit(setConfig, {
            breakDuration: parseInt(event.target.value, 10)
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
