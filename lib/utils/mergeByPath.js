'use strict'

module.exports = function mergeByPath (target, extend, path) {
  let result = extend

  if (path.length > 0) {
    const key = path[0]

    result = {
      [key]: mergeByPath(target[key], extend, path.slice(1))
    }
  }

  return Object.assign({}, target, result)
}
