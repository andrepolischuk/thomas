'use strict'
const html = require('bel')
const {ipcRenderer} = require('electron')
const init = require('./init')
const timer = require('./timer')
const finish = require('./finish')

const elements = {
  init,
  finish,
  work: timer,
  break: timer
}

function quit () {
  ipcRenderer.send('quit')
}

module.exports = function main (state, emit) {
  const element = elements[state.timer.stage || 'init']

  return html`
    <main>
      <header>
        <h1>Tom</h1>
        <button class="button button-small" onclick=${quit}>✕</button>
      </header>
      ${element(state, emit)}
    </main>
  `
}
