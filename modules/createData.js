'use strict'
const createData = require('dact')
const {config} = require('./config')
const {readLog} = require('../utils/log')

module.exports = function createDataWithMiddlewares (...middlewares) {
  const log = readLog()
  const title = log.length ? log[log.length - 1].title : ''

  const initialState = {
    timer: {
      title,
      stage: ''
    },
    log: log || [],
    config: config.store,
    message: null,
    location: 'timer'
  }

  return createData(initialState, ...middlewares)
}
