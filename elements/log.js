'use strict'
const html = require('bel')
const {clearLog} = require('../modules/log')
const {setLocation} = require('../modules/location')

module.exports = function log (state, emit) {
  let prevDate

  return html`
    <article>
      <h2>Log</h2>
      <ul>
        ${state.log.reduceRight((accumulated, item) => {
          const datetime = new Date(item.time)
          const date = datetime.toLocaleDateString()
          let titleElement

          if (prevDate !== date) {
            titleElement = html`
              <li>
                <small>${date}</small>
              </li>
            `

            prevDate = date
          }

          const element = html`
            <li disabled="${!item.completed}">
              <span>${item.title || 'Untitled'}</span>
              <small>
                ${datetime.toLocaleTimeString()}
              </small>
            </li>
          `

          return accumulated.concat(titleElement, element)
        }, [])}
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
