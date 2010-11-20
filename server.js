// Thermal server | Spencer Tipping
// Licensed under the terms of the MIT source code license

montenegro.clone('std db.file')(function () {

// Macros.
// These eliminate some boilerplate later on.

  defsubst[ok[_stuff]]   [qg[res.writeHead(200), res.end(_stuff)]];
  defsubst[error[_stuff]][qg[res.writeHead(500), res.end(_stuff)]];

// Prototype extensions.

  String.prototype.starts_with(s) = this.indexOf(s) === 0;
  String.prototype.sanitize()     = this.replace(/^\/+/, '').replace(/\.+/g, '.');

// Database.

  var db = caterwaul.db.file('db');

// Client files.
// The first thing to do is serve the stuff in client/.

  require('http').createServer(fn[req, res][(require('fs').readFile(req.url.sanitize(), 'ascii', fn[err, data][err ? error[err.toString()] : ok[data]]),
                                             when[req.url.starts_with('/client')]),
                                             
                                            (ok['[{name: "a story", comments: []}]'], when[req.url.starts_with('/stories')])]).listen(8080)})();

// Generated by SDoc 
