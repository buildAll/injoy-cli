'use strict'

const childProcess = require('child_process')

const exec = function (cmd, opt, cb) {
  let result = childProcess.execSync(cmd,  opt || {})

  if (result) {
    result = result.toString().trim()
  }

  if (cb && typeof cb === 'function') {
    cb()
  }

  return result
}

module.exports = exec
