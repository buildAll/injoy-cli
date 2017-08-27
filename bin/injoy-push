#!/usr/bin/env node

const program = require('commander')
const prepush = require('../lib/prepush')

program.parse(process.argv)

const args = program.args
const remote = args[0] || ''
const branch = args[1] || ''

prepush(remote, branch)
