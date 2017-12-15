'use strict'
const html = require('bel')
const mergeByPath = require('../utils/mergeByPath')
const numberField = require('./numberField')
const toggleField = require('./toggleField')
const keyField = require('./keyField')

module.exports = function listOfSettings (localState, emit, state, path = []) {
  if (state == null) {
    state = localState
  }

  return Object.entries(localState).map(([key, value]) => {
    const name = key
      .replace(/([A-Z])/g, m => ` ${m.toLowerCase()}`)
      .replace(/^\w/, m => m.toUpperCase())

    if (typeof value === 'object') {
      return html`
        <li>
          <div style="width: 100%;">
            <h5>${name}</h5>
            <ul>
              ${listOfSettings(localState[key], emit, state, path.concat(key))}
            </ul>
          </div>
        </li>
      `
    }

    const merge = extend => mergeByPath(state, {[key]: extend}, path)
    let element

    if (typeof value === 'number') {
      element = numberField(value, emit, merge)
    }

    if (typeof value === 'string') {
      element = keyField(value, emit, merge)
    }

    if (typeof value === 'boolean') {
      element = toggleField(value, emit, merge)
    }

    return html`
      <li>
        <span>${name}</span>
        <span>${element}</span>
      </li>
    `
  })
}
