'use strict'
const createData = require('dact')
const {config} = require('./config')

module.exports = function createDataWithMiddlewares (...middlewares) {
  const initialState = {
    timer: {
      stage: ''
    },
    config: config.store,
    message: null
  }

  return createData(initialState, ...middlewares)
}
