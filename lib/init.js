const fs = require('fs')
const path = require('path')
const cwd = process.cwd()
const program = require('commander')

const exec = require('../utils/exec')
const updatePkgJson = require('../utils/update-pkg-json')

const log = console.log

process.title = 'injoy init'

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

function initConfig () {
  const defaultConfig = {
     buildCommand: 'npm run build',
     distDir: 'dist',
     buildMsg: 'build package',
     freshDistInterval: 30
  }

  const fileContent = `module.exports = ${JSON.stringify(defaultConfig, null, 2)}`

  fs.writeFileSync(path.join(cwd, './injoy.config.js'), fileContent, 'utf-8')
}

function initDone () {
  log()
  log('injoy init done!')
  log()
}

function init () {
  log()
  log('injoy init start...')
  log()

  initHusky()
  initConfig()
  updatePkgJson({
    scripts: {
      injoypush: 'injoy pushexec && git push --no-verify',
      prepush: 'echo "\'git push\' is not allowed, pls use \'injoy push\' instead" && exit 1'
    }
  })
  initDone()
}

module.exports = init
