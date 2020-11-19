const fs = require('fs')

const res = fs.accessSync('/etc/hosts')
console.log(res)
