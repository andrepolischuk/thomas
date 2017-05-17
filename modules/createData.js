'use strict'
const createData = require('dact')
const {config} = require('./config')

module.exports = function createDataWithMiddlewares (...middlewares) {
  const initialState = {
    timer: {
      timerType: ''
    },
    config: config.store
  }

  return createData(initialState, ...middlewares)
}
