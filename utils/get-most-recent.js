const fs = require('fs')
const path = require('path')
const maxBy = require('lodash').maxBy

const walk = function(dir) {
  const results = []
  const list = fs.readdirSync(dir)

  list.forEach(function(file) {
    file = path.join(dir, file)
    const stat = fs.statSync(file)

    if (stat && stat.isDirectory()) results = results.concat(walk(file))
    else results.push(file)
  })

  return results
}

function getMostRecentFileName (dir) {
  const files = walk(dir)

  return maxBy(files, function (f) {
    return fs.statSync(f).mtime
  })
}

module.exports = getMostRecentFileName
