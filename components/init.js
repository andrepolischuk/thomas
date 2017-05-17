'use strict'
const html = require('bel')
const {start} = require('../modules/timer')
const {setConfig} = require('../modules/config')

module.exports = function init (state, emit) {
  const {interval, breakInterval} = state.config

  return html`
    <article>
      <span>new interval</span>
      <h1>
        <input
          type="number"
          value="${interval}"
          onchange=${event => emit(setConfig, {
            interval: event.target.value
          })} />
        →
        <input
          type="number"
          value="${breakInterval}"
          onchange=${event => emit(setConfig, {
            breakInterval: event.target.value
          })} />
      </h1>
      <button type="submit" onclick=${() => emit(start)}>
        Start
      </button>
    </article>
  `
}
