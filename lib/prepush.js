'use strict'

const updatePkgJson = require('../utils/update-pkg-json')
const exec = require('../utils/exec')

function prepush(remote, branch) {
  console.log('init injoy push...')

  updatePkgJson({
    scripts: {
      injoypush: `injoy pushexec && git push ${remote} ${branch} --no-verify`,
    }
  })

  console.log('start push!!')
  console.log(process.cwd())
  exec('npm run injoypush', {stdio: 'inherit'})
}

module.exports = prepush
