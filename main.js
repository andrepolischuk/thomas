'use strict'
const html = require('bel')
const delay = require('./utils/delay')
const notify = require('./utils/notify')
const formatMs = require('./utils/formatMs')
const {start, startBreak, tick, stop} = require('./timer')

module.exports = function main ({state, emit}) {
  const {timerType, timeout, remainingTime} = state

  if (timerType && remainingTime > 0) {
    delay(timeout).then(() => {
      emit(tick)
    })
  }

  if (timerType === 'work' && remainingTime <= 0) {
    notify('Done', 'Break for a 5 minutes')

    delay(timeout).then(() => {
      emit(startBreak)
    })
  }

  if (timerType === 'break' && remainingTime <= 0) {
    delay(timeout).then(() => {
      emit(stop)
    })

    notify('All done', 'Click to notification for start next interval').then(() => {
      emit(start)
    })
  }

  return html`
    <main>
      <span>${state.timerType || 'new interval'}</span>
      <h1>${state.timerType ? formatMs(state.remainingTime) : '25→5'}</h1>
      <button
        type="${timerType ? 'reset' : 'submit'}"
        onclick=${() => emit(timerType ? stop : start)}>
        ${timerType ? 'Stop' : 'Start'}
      </button>
    </main>
  `
}
