'use strict'

const path = require('path')
const fs = require('fs')
const exec = require('../utils/exec')
const getMostRecentFileName = require('../utils/get-most-recent')
const getDiffSeconds = require('../utils/get-diff-seconds')

const cwd = process.cwd()
const log = console.log

const cfg = require(path.join(cwd, 'injoy.config.js'))
const buildCommand = cfg.buildCommand
const maxDiffSecs = cfg.freshDistInterval
const commitMsg = cfg.buildMsg
const distDirName = cfg.distDir.replace(/^.\//, '')

process.title = 'injoy push'

function push () {
  const lastModifiedFile = getMostRecentFileName(path.join(cwd, distDirName))
  const lastModifiedDate = fs.statSync(lastModifiedFile).mtime
  const diffSecs = getDiffSeconds(lastModifiedDate)


  if (diffSecs > maxDiffSecs) {
    log()
    log(`injoy execute "${buildCommand}"`)
    log()
    exec(buildCommand, {stdio:'inherit'})
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

  log('everything is ready, injoy pushing')
}

module.exports = push
