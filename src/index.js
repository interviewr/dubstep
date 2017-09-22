const { resolve } = require('path')
const Workspace = require('./workspace')

const workspacePath = resolve('./sandbox')
const workspace = new Workspace({
  workspacePath
})

workspace.run()
