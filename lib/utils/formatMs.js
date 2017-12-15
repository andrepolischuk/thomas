'use strict'
const sec = 1000
const min = 60 * 1000

const zeroPad = number => `${number < 10 ? '0' : ''}${number}`

module.exports = function formatMs (ms = 0) {
  const normalMs = Math.round(ms / sec) * sec
  const minutes = zeroPad(Math.floor(normalMs / min))
  const seconds = zeroPad(Math.floor((normalMs - (minutes * min)) / sec))

  return `${minutes}:${seconds}`
}
