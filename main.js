'use strict'
const html = require('bel')
const {ipcRenderer} = require('electron')
const formatMs = require('./utils/formatMs')

module.exports = function main ({timerType, timeout, remainingTime}) {
  return html`
    <main>
      <span>${timerType || 'new interval'}</span>
      <h1>${timerType ? formatMs(remainingTime) : '25→5'}</h1>
      <button
        type="${timerType ? 'reset' : 'submit'}"
        onclick=${() => ipcRenderer.send(timerType ? 'stopTimer' : 'startTimer')}>
        ${timerType ? 'Stop' : 'Start'}
      </button>
    </main>
  `
}
