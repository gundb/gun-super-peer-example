var Gun = require('gun')
var http = require('http')
var fs = require('fs')

var server = http.createServer((req,res) => {
  res.writeHead(200)
  res.end(fs.readFileSync(__dirname + '/index.html'))
}).listen(8080)

var gun = Gun({web: server})
