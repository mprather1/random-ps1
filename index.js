var fs = require('fs')
var path = require('path')

const ROOT_DIR = process.env['ROOT_DIR']
const HOME_DIR = process.env['HOME_DIR']

var bashrc = path.join(HOME_DIR, '.bashrc')
var defaultRC = path.join('/etc', 'skel', '.bashrc')
var bashrcTxt = path.join(ROOT_DIR, 'bashrc.txt')

var colors = {
  grey: '\\[\\033[01;30m\\]',
  light_blue: '\\[\\033[01;34m\\]',
  blue: '\\[\\033[00;34m\\]',
  dark_purple: '\\[\\033[00;35m\\]',
  light_purple: '\\[\\033[01;35m\\]',
  light_cyan: '\\[\\033[01;36m\\]',
  cyan: '\\[\\033[00;36m\\]',
  light_green: '\\[\\033[01;32m\\]',
  green: '\\[\\033[00;32m\\]',
  light_red: '\\[\\033[01;31m\\]',
  red: '\\[\\033[00;31m\\]',
  brown: '\\[\\033[00;33m\\]',
  yellow: '\\[\\033[01;33m\\]'
}

var ps1Line = Buffer.from(`\nPS1="\${debian_chroot:($debian_chroot)}${randomColor()}\\u${randomColor()}@${randomColor()}\\h\\n${randomColor()}\\w${randomColor()}\\$(parse_git_branch)${randomColor()} >${randomColor()}>${randomColor()}>\\[\\033[00;37m\\] "\n`)

bashrcConfig(defaultRC, ps1Line)

function bashrcConfig (file) {
  fs.readFile(file, function (err, data) {
    if (err) console.log(err)

    readTxt(data)
  })
}

function readTxt (bashrcBuff) {
  fs.readFile(bashrcTxt, function (err, data) {
    if (err) console.log(err)

    writeFile(bashrcBuff, data)
  })
}

function writeFile (bufA, bufB) {
  const retval = Buffer.concat([bufA, bufB, ps1Line])
  fs.writeFile(bashrc, retval)
}

function randomColor () {
  var result
  var count = 0
  for (var prop in colors) {
    if (Math.random() < 1 / ++count) {
      result = prop
    }
  }

  return colors[result]
}
