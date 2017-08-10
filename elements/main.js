'use strict'
const html = require('bel')
const {ipcRenderer} = require('electron')
const log = require('./log')
const timer = require('./timer')
const formatMs = require('../utils/formatMs')
const {setLocation} = require('../modules/location')

const routes = {
  log,
  timer
}

module.exports = function main (state, emit) {
  const route = routes[state.location]
  let routeButton

  if (state.location === 'log') {
    routeButton = html`
      <button onclick=${() => emit(setLocation, 'timer')}>
        ${formatMs(state.timer.remainingTime)}
      </button>
    `
  }

  if (state.location === 'timer' && state.log.length > 0) {
    routeButton = html`
      <button onclick=${() => emit(setLocation, 'log')}>
        Log
      </button>
    `
  }

  return html`
    <main>
      <header>
        <h1>Thomas</h1>
        <article>
          ${routeButton}
          <button onclick=${() => ipcRenderer.send('quit')}>
            ✕
          </button>
        </article>
      </header>
      ${route(state, emit)}
    </main>
  `
}
