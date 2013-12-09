var http = require('http'); 
http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end('Hello World\n'); 
}).listen(8124, "127.0.0.1"); 


http.createServer(function (req, res) { 
    res.writeHead(200, {'Content-Type': 'text/plain'}); 
    res.end('Hello World 222\n'); 
}).listen(8088, "127.0.0.1"); 

console.log('Server running at http://127.0.0.1:8124/');