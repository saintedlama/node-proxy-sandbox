var http = require('http');
var httpProxy = require('http-proxy');
var fs = require('fs');
var path = require('path');

var proxy = httpProxy.createProxyServer({});

var routes = [
  {
    accept : function(req) {
      return /github\/.*/.test(req.url);
    },
    process : function(req, res) {
      var term = /github\/(.*)/.exec(req.url)[1];
      req.url = '/search?q=' + term;
      req.headers.host = 'github.com';

      proxy.web(req, res, { target: 'https://github.com/'});
    }
  },
  {
    accept : function() {
      return true;
    },
    process : function(req, res) {
      proxy.web(req, res, { target: 'http://127.0.0.1:3000' });
    }
  }
];

var server = http.createServer(function(req, res) {
  for (var i=0;i<routes.length;i++) {
    if (routes[i].accept(req)) {
      routes[i].process(req, res);
      return;
    }
  }
});

console.log('Proxy server listening on port "5050" and forwarding to target "http://127.0.0.1:5060"');

server.listen(5050);