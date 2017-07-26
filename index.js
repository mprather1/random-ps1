var colors = [
  'light_blue',
  'blue',
  'dark_purple',
  'light_purple',
  'light_cyan',
  'cyan',
  'light_green',
  'green',
  'light_red',
  'red',
  'brown',
  'yellow'
]

function randomColor () {
  var min = 0
  var max = colors.length - 1
  return colors[Math.floor(Math.random() * (max - min + 1) + min)]
}

var ps1Line = `PS1="\${debian_chroot:($debian_chroot)}$${randomColor()}\\u$${randomColor()}@$${randomColor()}\\h\\n$${randomColor()}\\w$${randomColor()}\\$(parse_git_branch)$${randomColor()} >$${randomColor()}>$${randomColor()}>$${randomColor()} "`

console.log(ps1Line)
