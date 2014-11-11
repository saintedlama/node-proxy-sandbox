var http = require('http');
var httpProxy = require('http-proxy');

var server = http.createServer(function(req, res) {
  var options = { target: 'http://127.0.0.1:3000' };
  var proxy = httpProxy.createProxyServer(options);

  // each proxy will listen so we need to increment the max listeners...
  req.setMaxListeners(101);

  for (var i =0;i<100;i++) {
    proxy.web(req, new http.ServerResponse(req));
  }

  proxy.web(req, res);
});

console.log('Proxy server listening on port "5050" and forwarding to target "http://127.0.0.1:5060"');

server.listen(5050);