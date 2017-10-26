'use strict'
const html = require('bel')
const {clearLog} = require('../../modules/log')
const {setLocation} = require('../../modules/location')

module.exports = function log (state, emit) {
  let prevDate
  let clearButton

  const logItems = state.log.reduceRight((acc, item) => {
    const date = new Date(item.time).toLocaleDateString()

    if (prevDate !== date) {
      acc[date] = []
      prevDate = date
    }

    acc[date].push(item.duration)

    return acc
  }, {})

  let logElement = Object.keys(logItems).map(date => html`
    <li>
      <span>${date}</span>
      <small>${logItems[date].length}x</small>
    </li>
  `)

  if (logElement.length === 0) {
    logElement = html`
      <center>
        You don't have completed intervals yet
      </center>
    `
  } else {
    clearButton = html`
      <button onclick=${() => {
        emit(clearLog)
        emit(setLocation, 'timer')
      }}>
        Clear
      </button>
    `
  }

  return html`
    <article>
      <header>
        <h1>Log</h1>
      </header>
      <ul>
        ${logElement}
      </ul>
      <footer>
        ${clearButton}
      </footer>
    </article>
  `
}
