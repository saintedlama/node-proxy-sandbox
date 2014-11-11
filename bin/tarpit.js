var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');
var path = require('path');

var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function (req, res) {
  setTimeout(function () {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3000'
    });
  }, 500);
});

console.log('Proxy server listening on port "5050" and forwarding to target "http://127.0.0.1:5060"');

server.listen(5050);