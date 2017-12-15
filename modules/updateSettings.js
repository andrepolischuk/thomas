'use strict'

module.exports = function updateSettings (settings, {state}) {
  return {
    settings: Object.assign({}, state.settings, settings)
  }
}
