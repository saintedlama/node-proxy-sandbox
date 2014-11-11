var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');
var path = require('path');

var proxy = httpProxy.createProxyServer({});

var requestCount = 0;

var server = http.createServer(function(req, res) {
  proxy.on('end', function(req, res) {
    requestCount++;

    var outputFile = path.join(__dirname, '..', 'request-logs', 'request' + requestCount + '.json');

    fs.writeFile(outputFile, JSON.stringify({
      req : {
        headers : req.headers,
        method : req.method,
        url : req.url
      },
      res : {
        statusCode : res.statusCode
      }
    }, null, '\t'));
  });

  proxy.web(req, res, { target: 'http://127.0.0.1:3000' });
});

console.log('Proxy server listening on port "5050" and forwarding to target "http://127.0.0.1:5060"');

server.listen(5050);