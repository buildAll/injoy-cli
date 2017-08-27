const fs = require('fs')
const path = require('path')
const merge = require('lodash').merge
const cwd = process.cwd()
const log = console.log

function updatePkgJson (newContent) {
  log()
  log('it is going to update package.json to add npm scripts......')
  log()
  const pkgPath = path.join(cwd, 'package.json')
  const pkgContent = require(pkgPath)

  merge(pkgContent, newContent)

  fs.writeFileSync(pkgPath, JSON.stringify(pkgContent, null, 2))

  log()
  log('npm scripts added!')
  log()
}

module.exports = updatePkgJson
