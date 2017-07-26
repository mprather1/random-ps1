var fs = require('fs')
var path = require('path')

const ROOT_DIR = process.env['ROOT_DIR']
const dir = path.join(ROOT_DIR, 'bashrc.txt')

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

var ps1Line = `\nPS1="\${debian_chroot:($debian_chroot)}${randomColor()}\\u${randomColor()}@${randomColor()}\\h\\n${randomColor()}\\w${randomColor()}\\$(parse_git_branch)${randomColor()} >${randomColor()}>${randomColor()}>\\[\\033[00;37m\\] "\n`

const bufA = Buffer.from(ps1Line)

fs.readFile(dir, function (err, data) {
  if (err) console.log(err)

  const retval = Buffer.concat([data, bufA])
  fs.writeFile(path.join(ROOT_DIR, 'bashrc.tmp'), retval)
})
