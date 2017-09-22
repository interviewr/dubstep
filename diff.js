const diff = require('diff')
const before = `
  a
  b
  c
`

const after = `
  a
  d
  c
`

const patch = diff.createPatch('1.txt', before, after)

console.log('------- PATCH  -------')
console.log(patch)
console.log('------- PATCH  -------')

const patched = diff.applyPatch(before, patch)
console.log(patched)
