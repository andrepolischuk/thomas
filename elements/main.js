'use strict'
const html = require('bel')
const {ipcRenderer} = require('electron')
const init = require('./init')
const timer = require('./timer')

function quit () {
  ipcRenderer.send('quit')
}

module.exports = function main (state, emit) {
  const component = state.timer.timerType ? timer : init

  return html`
    <main>
      <header>
        <h1>Tom</h1>
        <button class="button button-small" onclick=${quit}>✕</button>
      </header>
      ${component(state, emit)}
    </main>
  `
}
