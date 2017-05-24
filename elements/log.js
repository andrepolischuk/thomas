'use strict'
const html = require('bel')
const {clearLog} = require('../modules/log')
const {setLocation} = require('../modules/location')

module.exports = function log (state, emit) {
  let prevDate

  return html`
    <article>
      <header>
        <h2>Log</h2>
      </header>
      <ul>
        ${state.log.reduceRight((accumulated, item) => {
          const date = new Date(item.time).toLocaleDateString()
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
            <li>
              <span>${item.title || 'Untitled'}</span>
              <small>
                ${item.duration ? `${item.duration}m` : 'Canceled'}
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
