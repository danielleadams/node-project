var add = require('bindings')('add.node')

console.log('This should be eight:', add.add(3, 5))
