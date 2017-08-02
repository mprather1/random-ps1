var fs = require('fs')
var path = require('path')
const PWD = process.argv[2]
const HOME = process.env['HOME']
const logger = require("winston-color")
var defaultRC = path.join('/etc', 'skel', '.bashrc')
var bashrc = path.join(HOME, '.bashrc')
var bashrcTxt = path.join(PWD, 'bashrc.txt')

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


fs.readFile(defaultRC, function (err, data) {
  if (err) {
    logger.error(err)
  }
  
  readTxt(data, bashrcTxt, bashrc, logger)
})

function readTxt (bashrcBuff, txt, bashrc, logger) {
  fs.readFile(txt, function (err, data) {
    if (err) {
      logger.error(err)
    }
    writeFile(bashrcBuff, data, bashrc, logger)
  })
}

function writeFile (bufA, bufB, bashrc, logger) {
  const retval = Buffer.concat([bufA, bufB, ps1Line])
  logger.info(`writing to ${bashrc}`)
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
