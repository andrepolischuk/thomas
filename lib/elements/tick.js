'use strict'
const html = require('bel')
const formatMs = require('../utils/formatMs')
const breakTip = require('../utils/breakTip')
const {cancel} = require('../../modules/timer')

let nextTip
let prevStage

module.exports = function timer (state, emit) {
  const {breakDuration} = state.config
  const {stage, remainingTime} = state.timer
  let pageElement

  if (prevStage !== stage) {
    nextTip = breakTip()
    prevStage = stage
  }

  if (stage === 'interval') {
    pageElement = html`
      <div class="timer">
        ${formatMs(remainingTime)}
      </div>
    `
  } else {
    pageElement = html`
      <header>
        <h1>
          Done. Break for a ${breakDuration} minutes. ${nextTip}.
        </h1>
      </header>
    `
  }

  return html`
    <main>
      ${pageElement}
      <footer>
        <button type="reset" onclick=${() => emit(cancel)}>
          Cancel
        </button>
      </footer>
    </main>
  `
}
