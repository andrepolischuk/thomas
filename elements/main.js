'use strict'
const html = require('bel')
const {ipcRenderer} = require('electron')
const log = require('./log')
const init = require('./init')
const timer = require('./timer')
const finish = require('./finish')
const formatMs = require('../utils/formatMs')
const {setLocation} = require('../modules/location')

const routes = {
  log,
  timer: {
    init,
    finish,
    work: timer,
    break: timer
  }
}

module.exports = function main (state, emit) {
  const isTimer = state.location === 'timer'
  const route = routes[state.location]
  const element = isTimer ? route[state.timer.stage || 'init'] : route
  let routeButton

  if (state.log.length > 0) {
    routeButton = html`
      <button
        class="button button-small"
        onclick=${() => emit(setLocation, isTimer ? 'log' : 'timer')}>
        ${isTimer ? 'Log' : `${formatMs(state.timer.remainingTime)}`}
      </button>
    `
  }

  return html`
    <main>
      <header>
        <h1>Tom</h1>
        <article>
          ${routeButton}
          <button
            class="button button-small"
            onclick=${() => ipcRenderer.send('quit')}>
            ✕
          </button>
        </article>
      </header>
      ${element(state, emit)}
    </main>
  `
}
