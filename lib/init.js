const fs = require('fs')
const path = require('path')
const cwd = process.cwd()
const program = require('commander')

const exec = require('../utils/exec')
const updatePkgJson = require('../utils/update-pkg-json')

const log = console.log

process.title = 'injoy'

program
  .usage('injoy init')

function initHusky () {
  const huskyPath = path.join(cwd, 'node_modules', 'husky')

  if (fs.existsSync(huskyPath)) {
    log()
    log('husky is ready')
    log()
  } else {
    log()
    log('injoy needs husky, so it will install husky...')
    log()
    exec('npm install husky --save-dev', {stdio: 'inherit'})
  }
}

function initDone () {
  log()
  log('injoy init done!')
  log()
  process.exit(1)
}

function init () {
  log()
  log('injoy init start...')
  log()

  initHusky()
  updatePkgJson({
    scripts: {
      injoypush: 'injoy pushexec && git push --no-verify --set-upstream',
      prepush: 'echo "\'git push\' is not allowed, pls use \'injoy push\' instead" && exit 1'
    }
  })
  initDone()
}

module.exports = init