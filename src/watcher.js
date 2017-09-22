const { EventEmitter } = require('events')
const chokidar = require('chokidar')
const debug = require('debug')('watcher')

const { watcher: { defaultIgnore } } = require('./constants')

class Watcher extends EventEmitter {
  constructor ({ workspacePath }) {
    super()

    this.workspacePath = workspacePath
    this.isReady = false

    this.onReady = this.onReady.bind(this)
    this.onError = this.onError.bind(this)
  }

  run () {
    const createLogger = type => (...args) => {
      return this.log(type, ...args)
    }

    this.watcher = chokidar.watch(this.workspacePath, {
      ignored: defaultIgnore
    })

    this.watcher
      .on('ready', this.onReady)
      .on('error', this.onError)

      .on('add', createLogger('add'))
      .on('change', createLogger('change'))
      .on('unlink', createLogger('unlink'))

      .on('addDir', createLogger('addDir'))
      .on('unlinkDir', createLogger('unlinkDir'))
  }

  log (type, path) {
    this.emit('update', type, path)
    debug(type, path)
  }

  onReady () {
    this.emit('ready')
    this.isReady = true
  }

  onError (err) {
    this.emit('error', err)
  }
}

module.exports = Watcher
