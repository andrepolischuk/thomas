'use strict'

module.exports = function cancel ({state}) {
  return {
    timer: {
      stage: ''
    }
  }
}
