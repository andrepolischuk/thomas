module.exports = (settings, preferences) => {
  console.log(settings, preferences)
  document.documentElement.dataset.darkMode = settings.followSystemAppearance
    ? preferences.darkMode
    : settings.darkMode
}
