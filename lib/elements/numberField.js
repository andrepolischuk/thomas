'use strict'
const html = require('bel')
const {updateSettings} = require('../../modules/settings')

module.exports = function numberField (value, emit, merge) {
  return html`
    <input
      type="number"
      value="${value}"
      onchange=${event => emit(
        updateSettings,
        merge(parseInt(event.target.value, 10))
      )} />
  `
}
