const path = require('path')
const fs = require('fs')
const isObject = require('lodash').isObject

const writeFile = fs.writeFileSync
const isExist = fs.existsSync
const deleteFile = fs.unlink

function formatContent (content) {
  return JSON.stringify(content, null, 2)
}

function FakeJson (fakeContent, fileName) {
  const timestamp = +new Date

  if (!fakeContent) {
    throw new Error('fake json needs content')
  }

  if (!isObject(fakeContent)) {
    throw new TypeError('fake json needs object as content')
  }

  fileName = fileName && fileName.replace(/.json$/, '') || 'package'

  this.fakeContent = fakeContent
  this.jsonPath = path.join(process.cwd(), `${fileName}.json`)
  this.tmpRealPath = `${this.jsonPath}__${timestamp}`
}

FakeJson.prototype.keepRealJson = function () {
  const realJson = require(this.jsonPath)

  writeFile(this.tmpRealPath, formatContent(realJson))
}

FakeJson.prototype.create = function () {
  if (isExist(this.tmpRealPath)) {
    writeFile(this.jsonPath, formatContent(this.fakeContent))
  } else {
    throw new Error('no real json found. please call keepRealJson first!')
  }
}

FakeJson.prototype.removeFake = function () {
  if (isExists(this.tmpRealPath)) {
    deleteFile(this.jsonPath)
  } else {
    throw new Error('no real json found. please call keepRealJson first!')
  }
}

FakeJson.prototype.resetRealJson = function () {
  const realJson = require(this.tmpRealPath)

  writeFile(this.jsonPath, formatContent(realJson))
}
