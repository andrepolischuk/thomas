module.exports = settings => {
  for (const key in settings) {
    document.documentElement.dataset[key] = settings[key]
  }
}
