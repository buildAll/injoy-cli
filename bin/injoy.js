#!/usr/bin/env node

console.log('start injoy...')

process.title = 'injoy'

require('commander')
  .version(require('../package').version)
  .usage('<command> [parameter]')
  .command('init', 'init snap ui project')
  .command('push', 'run npm build before push')
  .command('pushexec', 'execute git push')
  .parse(process.argv)
