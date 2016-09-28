module.exports = {
  buildErrorMsg (msgs) {
    var msgOut = ''
    for (var i = 0; i < msgs.length; i++) {
      i === 0 ? msgOut += msgs[i] : msgOut += ', ' + msgs[i]
    }
    return ['Please fill in the following fields: ' + msgOut + '...']
  }
}
