'use strict'
const createData = require('dact')
const {config} = require('./config')

module.exports = function createDataWithMiddlewares (...middlewares) {
  const initialState = {
    timer: {
      stage: ''
    },
    log: [],
    config: config.store,
    location: 'timer'
  }

  return createData(initialState, ...middlewares)
}
