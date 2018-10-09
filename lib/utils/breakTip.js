'use strict'

const tips = ['Call someone', 'Walk around', 'Drink a glass of water']

module.exports = function breakTip () {
  const variant = Math.floor(Math.random() * tips.length)

  return tips[variant]
}
