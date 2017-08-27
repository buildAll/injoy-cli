'use strict'

const updatePkgJson = require('../utils/update-pkg-json')
const FakeJson = require('../utils/fake-pkg-json')
const exec = require('../utils/exec')

function prepush(remote, branch) {
  console.log('init injoy push...')

  const fakeJson = new FakeJson({
    scripts: {
      injoypush: `injoy pushexec && git push ${remote} ${branch} --no-verify`,
    }
  })

  console.log('start push!!')
  console.log(process.cwd())
  try {
    exec('npm run injoypush', {stdio: 'inherit'})
    fakeJson.resetRealJson()
  } catch(err) {
    fakeJson.resetRealJson()
  }

  console.log('injoy push done')
}

module.exports = prepush
