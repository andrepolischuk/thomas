'use strict'
const defaults = require('./defaults')

module.exports = function normalizeSettings (settings) {
  const nextSettings = Object.assign({}, defaults)

  Object.entries(settings).forEach(([key, value]) => {
    nextSettings[key] = value
  })

  return nextSettings
}
