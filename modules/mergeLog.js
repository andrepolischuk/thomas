'use strict'

module.exports = function mergeLog (log, {state}) {
  return {
    log: state.log.concat(log)
  }
}
