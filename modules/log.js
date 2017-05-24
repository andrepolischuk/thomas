'use strict'

exports.mergeLog = function mergeLog (log, {state}) {
  return {
    log: state.log.concat(log)
  }
}

exports.clearLog = function clearLog () {
  return {
    log: []
  }
}
