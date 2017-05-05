'use strict'
const SECOND = 1000
const MINUTE = 60 * 1000

function appendLeadingZero (number) {
  return `${number < 10 ? '0' : ''}${number}`
}

module.exports = function formatMs (ms) {
  const normalMs = Math.round(ms / SECOND) * SECOND
  const minutes = appendLeadingZero(Math.floor(normalMs / MINUTE))
  const seconds = appendLeadingZero(Math.floor((normalMs - (minutes * MINUTE)) / SECOND))

  return `${minutes}:${seconds}`
}
