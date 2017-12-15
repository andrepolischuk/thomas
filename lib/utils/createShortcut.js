'use strict'
const modifierKeys = require('./modifierKeys')

module.exports = function createShortcut (event, value) {
  const isModifier = event.keyCode === 91 ||
    (event.keyCode > 15 && event.keyCode < 19)

  event.preventDefault()

  if (isModifier) {
    return value
  }

  const keys = []

  Object.entries(modifierKeys).forEach(([key, m]) => {
    if (event[m.key]) {
      keys.push(key)
    }
  })

  keys.push(event.key.replace(/^\w/, m => m.toUpperCase()))

  return keys.join('+')
}
