var Clusterizer = function () {};

Clusterizer.prototype.init = function () {
  this.cluster  = require('cluster');
  this.http     = require('http');
  this.numCPUs  = require('os').cpus().length;

  var timeouts = [];
  function errorMsg() {
    console.error("Something must be wrong with the connection...");
  }

  // Logging
  this.cluster.on('fork',       function(worker)               { 
    timeouts[worker.id] = setTimeout(errorMsg, 2000);
  });
  this.cluster.on('online',     function(worker)               { 
    console.log('Goliath ' + worker.process.pid + ' online.');
  });
  this.cluster.on('listening',  function(worker, address)      { 
    clearTimeout(timeouts[worker.id]);
    console.log('Goliath ' + worker.process.pid + ' listening on ' + address.address + ':' + address.port); });
  this.cluster.on('exit',       function(worker, code, signal) { 
    console.log('Goliath ' + worker.process.pid + ' exited on ' + code + ':' + signal);
  });

  // Forkification
  if (this.cluster.isMaster) {
    for (var i = 0; i < this.numCPUs; i++) {
      this.cluster.fork();
    }

  } else {
    // Workers can share any TCP connection
    // In this case its a HTTP server
    this.http.createServer(function(req, res) {
      res.writeHead(200);
      res.end("Goliath says hello\n");
    }).listen(8000);
  }
};

module.exports = Clusterizer;