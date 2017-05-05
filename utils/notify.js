/* globals Notification */
'use strict'

module.exports = function notify (title, body) {
  return new Promise(resolve => {
    const notification = new Notification(title, {body})

    notification.addEventListener('click', resolve)
  })
}
