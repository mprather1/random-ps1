const fs = require('fs')
const path = require('path')
const { promisify } = require("util")
const winston = require('winston')
const os = require("os")

const HOME = os.homedir()
const PWD = process.cwd()
const DEFAULT = path.join('/etc', 'skel', '.bashrc')
const NEW = path.join(PWD, 'bashrc.txt')
const LOCATION = path.join(HOME, '.bashrc')
const PKG = require(path.join(PWD, 'package.json'))

const colors = {
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

var ps1Line = Buffer.from(`\nPS1="\${debian_chroot:($debian_chroot)}${randomColor()}\\u${randomColor()}@${randomColor()}\\H\\n${randomColor()}\\w${randomColor()}\\$(parse_git_branch)${randomColor()} >${randomColor()}>${randomColor()}>\\[\\033[00;37m\\] "\n`)

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ],

  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  )
})

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

initialize()

async function initialize () {
  try {
    const buffA = await readFile(DEFAULT)
    const buffB = await readFile(NEW)
    const retval = Buffer.concat([buffA, buffB, ps1Line])

    logger.info(`writing to ${LOCATION}`)
    await writeFile(LOCATION, retval)
    logger.info(`${PKG.name} - success...`)
  } catch (err) {
    logger.error(err)
  }
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
