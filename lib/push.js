'use strict'

const exec = require('../utils/exec')
const commitMsg = process.argv[5] || 'build package'
const distDirName = process.argv[9] || 'dist'

function push () {
  exec('npm run build', {stdio:'inherit'})

  const diff = exec('git diff --name-only').split('\n')

  let dists = diff.map( fileName => {
    if (fileName.indexOf(`${distDirName}/`) > -1) {
      return fileName
    }
  })

  dists = dists.filter(v => v);

  if (dists.length) {
    exec(`git add ${dists.join(' ')}`)
    exec(`git commit -m "${commitMsg}"`)
  }

  console.log('everything is ready, injoy pushing')
}

module.exports = push
