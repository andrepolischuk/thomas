'use strict'
const html = require('bel')
const log = require('./log')
const init = require('./init')
const tick = require('./tick')
const finish = require('./finish')
const {setLocation} = require('../../modules/location')

const routes = {
  timer: {
    init,
    finish,
    break: tick,
    interval: tick
  },
  log
}

const icons = {
  timer: '▶',
  log: '☰'
}

module.exports = function main (state, emit) {
  let route = routes[state.location]

  if (typeof route === 'object') {
    route = route[state.timer.stage || 'init']
  }

  const navElement = Object.keys(routes).map(route => html`
    <button
      onclick=${() => emit(setLocation, route)}
      aria-selected="${state.location === route}">
      ${icons[route]}
    </button>
  `)

  return html`
    <main>
      <nav>
        ${navElement}
      </nav>
      ${route(state, emit)}
    </main>
  `
}
