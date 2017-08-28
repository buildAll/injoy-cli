const path = require('path')
const fs = require('fs')
const isObject = require('lodash').isObject
const merge = require('lodash').merge

const writeFile = fs.writeFileSync
const rename = fs.renameSync
const isExist = fs.existsSync
const deleteFile = fs.unlinkSync

const timestamp = +new Date

const log = console.log

function formatContent (content) {
  return JSON.stringify(content, null, 2)
}

function FakeJson (fakeContent, fileName) {
  if (!fakeContent) {
    throw new Error('fake json needs content')
  }

  if (!isObject(fakeContent)) {
    throw new TypeError('fake json needs object as content')
  }

  this.timestamp = timestamp

  fileName = fileName && fileName.replace(/.json$/, '') || 'package'

  this.fakeContent = fakeContent
  this.jsonPath = path.join(process.cwd(), `${fileName}.json`)
  this.tmpRealPath = `${this.jsonPath.replace(/.json$/, '')}__${timestamp}__.json`

  this._keepRealJson()
  this._create()
}

FakeJson.prototype._keepRealJson = function () {
  this.realJson = require(this.jsonPath)

  rename(this.jsonPath, this.tmpRealPath)
  log()
  log(`get fake json`)
  log()
}

FakeJson.prototype._create = function () {
  if (isExist(this.tmpRealPath)) {
    writeFile(this.jsonPath, formatContent(merge(this.realJson, this.fakeContent)))
  } else {
    throw new Error('fake json create fail! no real json found. please call keepRealJson first.')
  }
}

FakeJson.prototype._removeFake = function () {
  if (isExist(this.tmpRealPath)) {
    isExist(this.jsonPath) &&  deleteFile(this.jsonPath)
  } else {
    throw new Error('fake json remove fail! no real json found. please call keepRealJson first!')
  }
}

FakeJson.prototype.resetRealJson = function () {
  const realJson = require(this.tmpRealPath)

  this._removeFake()
  rename(this.tmpRealPath, this.jsonPath)
  log()
  log(`remove fake json`)
  log()
}

module.exports = FakeJson
