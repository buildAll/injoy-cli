'use strict'

const path = require('path')
const fs = require('fs')
const exec = require('../utils/exec')
const getMostRecentFileName = require('../utils/get-most-recent')
const getDiffSeconds = require('../utils/get-diff-seconds')
const commitMsg = process.argv[5] || 'build package'
const distDirName = process.argv[9] || 'dist'

const maxDiffSecs = 30

const cwd = process.cwd()

process.title = 'injoy push'

function push () {
  const lastModifiedFile = getMostRecentFileName(path.join(cwd, distDirName))
  const lastModifiedDate = fs.statSync(lastModifiedFile).mtime
  const diffSecs = getDiffSeconds(lastModifiedDate)

  if (diffSecs > maxDiffSecs) {
    exec('npm run build', {stdio:'inherit'})
  }

  const diff = exec('git diff --name-only').split('\n')

  let dists = diff.map( fileName => {
    if (fileName.indexOf(`${distDirName}/`) > -1) {
      return fileName
    }
  })

  dists = dists.filter(v => v)

  if (dists.length) {
    exec(`git add ${dists.join(' ')}`)
    exec(`git commit -m "${commitMsg}"`)
  }

  console.log('everything is ready, injoy pushing')
}

module.exports = push
