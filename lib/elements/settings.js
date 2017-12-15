'use strict'
const html = require('bel')
const listOfSettings = require('./listOfSettings')
const normalizeSettings = require('../../modules/normalizeSettings')

module.exports = function settings ({settings}, emit) {
  const state = normalizeSettings(settings)

  return html`
    <article>
      <header>
        <h1>Settings</h1>
      </header>
      <ul>
        ${listOfSettings(state, emit)}
      </ul>
    </article>
  `
}
