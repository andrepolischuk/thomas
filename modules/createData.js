'use strict'
const createData = require('dact')
const {settings} = require('./settings')

module.exports = function createDataWithMiddlewares (...middlewares) {
  const initialState = {
    timer: {
      stage: ''
    },
    log: [],
    location: 'timer',
    settings: settings.getAll()
  }

  return createData(initialState, ...middlewares)
}
