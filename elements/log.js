'use strict'
const html = require('bel')
const {clearLog} = require('../modules/log')
const {setLocation} = require('../modules/location')

module.exports = function log (state, emit) {
  let prevDate

  const logItems = state.log.reduceRight((acc, item) => {
    const date = new Date(item.time).toLocaleDateString()

    if (prevDate !== date) {
      acc[date] = []
      prevDate = date
    }

    acc[date].push(item.duration)

    return acc
  }, {})

  const logElement = Object.keys(logItems).map(date => html`
    <li>
      <span>${date}</span>
      <small>${logItems[date].length}x</small>
    </li>
  `)

  return html`
    <article>
      <header>
        <h2>Log</h2>
      </header>
      <ul>
        ${logElement}
      </ul>
      <footer>
        <button class="button" onclick=${() => {
          emit(clearLog)
          emit(setLocation, 'timer')
        }}>
          Clear
        </button>
      </footer>
    </article>
  `
}
