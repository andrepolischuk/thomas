/* globals localStorage */
'use strict'

exports.readLog = function readLog () {
  let log

  try {
    log = JSON.parse(localStorage.getItem('log'))
  } catch (e) {}

  return log || []
}

exports.writeLog = function writeLog (log) {
  try {
    localStorage.setItem('log', JSON.stringify(log))
  } catch (e) {}
}
