const { EventEmitter } = require('events')
const debug = require('debug')('workspace')

const Watcher = require('./watcher')

class Workspace extends EventEmitter {
  constructor ({ workspacePath }) {
    super()

    this.watcher = new Watcher({
      workspacePath
    })
    this.onUpdate = this.onUpdate.bind(this)
  }

  run () {
    debug('Workspace absolute path:', this.workspacePath)
    this.watcher.run()
    this.watcher.on('update', this.onUpdate)
  }

  async onUpdate (type, path) {
  }
}

module.exports = Workspace
