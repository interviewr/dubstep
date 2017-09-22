const { EventEmitter } = require('events')
const fs = require('mz/fs')

const debug = require('debug')('workspace')

const Watcher = require('./watcher')

class Workspace extends EventEmitter {
  constructor ({ workspacePath }) {
    super()

    this.workspacePath = workspacePath
    this.watcher = new Watcher({
      workspacePath
    })
    this.onUpdate = this.onUpdate.bind(this)
    this.flatTree = {}
  }

  run () {
    debug('Workspace absolute path:', this.workspacePath)
    this.watcher.run()
    this.watcher.on('update', this.onUpdate)
  }

  async addToFlatTree (type, path, content) {
    this.flatTree[path] = {
      type,
      content
    }
  }

  async onUpdate (type, path) {
    switch (type) {
      case 'addDir': {
        this.addToFlatTree('dir', path)
        return
      }

      case 'add': {
        try {
          const content = await fs.readFile(path)
          this.addToFlatTree('file', path, content)
        } catch (err) {
          console.error(err)
        }
        return
      }

      case 'change': {
        try {
          const content = await fs.readFile(path)
          // const prevContent = this.flatTree[path].content

          console.log('diff here')
          this.addToFlatTree('file', path, content)
        } catch (err) {
          console.error(err)
        }
      }
    }
  }
}

module.exports = Workspace
