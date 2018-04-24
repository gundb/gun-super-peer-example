// var Gun = require('gun')
// var http = require('http')
// var fs = require('fs')

// var server = http.createServer((req,res) => {
//   res.writeHead(200)
//   res.end(fs.readFileSync(__dirname + '/index.html'))
// }).listen(80)

// var gun = Gun({web: server})


var port = process.env.PORT || process.argv[2] || 8080;

var Gun = require('gun');

var server = require('http').createServer(function(req, res){
	if(Gun.serve(req, res)){ return } // filters gun requests!
	require('fs').createReadStream(require('path').join(__dirname, req.url)).on('error',function(){ // static files!
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(require('fs')
			.readFileSync(require('path')
			.join(__dirname, 'index.html') // or default to index
		));
	}).pipe(res); // stream
});

var gun = Gun({ 
	// file: 'data.json',
	web: server,
});

server.listen(port);

console.log('Server started on port ' + port + ' with /gun');