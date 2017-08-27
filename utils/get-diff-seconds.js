function gitDiffSeconds (date) {
  var diffMs = Math.abs(new Date(date) - new Date()) // milliseconds between now & Christmas

  // var diffDays = Math.floor(diffMs / 86400000) // days
  // var diffHrs = Math.floor((diffMs % 86400000) / 3600000) // hours
  // var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000) // minutes
  var diffSecs = Math.round(((diffMs % 86400000) % 3600000) / 60000 * 60) // seconds

  return diffSecs
}

module.exports = gitDiffSeconds
