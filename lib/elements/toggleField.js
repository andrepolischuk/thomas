'use strict'
const html = require('bel')
const updateSettings = require('../../modules/updateSettings')

module.exports = function toggleField (value, emit, merge) {
  return html`
    <button
      type="${value ? 'submit' : 'button'}"
      onclick=${event => emit(
        updateSettings,
        merge(!value)
      )}>
      ${value ? 'Enabled' : 'Disabled'}
    </button>
  `
}
