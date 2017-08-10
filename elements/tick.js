'use strict'
const html = require('bel')
const formatMs = require('../utils/formatMs')
const breakTip = require('../utils/breakTip')
const {cancel} = require('../modules/timer')

let nextTip
let prevStage

module.exports = function timer (state, emit) {
  const {breakDuration} = state.config
  const {stage, remainingTime} = state.timer
  let titleElement

  if (prevStage !== stage) {
    nextTip = breakTip()
    prevStage = stage
  }

  if (stage === 'interval') {
    titleElement = html`
      <div class="timer">
        ${formatMs(remainingTime)}
      </div>
    `
  } else {
    titleElement = html`
      <h2>
        Done. Break for a ${breakDuration} minutes. ${nextTip}.
      </h2>
    `
  }

  return html`
    <article>
      <header>
        ${titleElement}
      </header>
      <footer>
        <button type="reset" onclick=${() => emit(cancel)}>
          Cancel
        </button>
      </footer>
    </article>
  `
}
