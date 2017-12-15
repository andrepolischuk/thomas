# thomas [![Build Status][travis-image]][travis-url]

> Simple pomodoro timer

![](media/screenshot.png)

## Usage

[Download the latest release!](https://github.com/andrepolischuk/thomas/releases/latest)

### Features

* 25/5 minutes interval by default, but you can configure this
* Built-in configurable keyboard shortcuts
* Minimal log that contains all completed intervals counts per day
* Tray icon and progress bar

### Shortcuts

* `CommandOrControl+Alt+T` — show application
* `Escape` — hide application
* `CommandOrControl+Enter` — start/cancel timer

## Contribute

Fork this repository, clone to your local device and install dependencies:

```sh
npm install
npm start
```

If you use Ubuntu or Debian, you also may need to install `nodejs-legacy` that creates `node` symlink:

```sh
sudo apt-get install nodejs-legacy
```

You can pack application for specified platform:

```sh
npm run dist:macos
npm run dist:linux
npm run dist:windows
```

## License

MIT

[travis-url]: https://travis-ci.org/andrepolischuk/thomas
[travis-image]: https://travis-ci.org/andrepolischuk/thomas.svg?branch=master
