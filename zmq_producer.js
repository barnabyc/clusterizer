var zmq          = require('zmq')
  , socketMethod = 'push'
  , sock         = zmq.socket( socketMethod )
  , pid          = process.pid
  , connection   = 'tcp://127.0.0.1:9987' // 'ipc:///tmp/feeds0'
  , counter      = 0,
    produce;

produce = function () {
  var hrt = process.hrtime()
    , suffix
    , work;

  counter++;
  suffix = counter % 100 === 0 ? '----------'+counter : counter;

  console.log(
    'sending work: '
    + pid
    + '-['
      + hrt.join('.')
    + ']'
    + '-'
    + suffix
  );

  work = 'foo-bar-do-a-thing: '
       + pid
       + '-'
       + counter
       + suffix;

  sock.send( work );
};

try {
  sock.bindSync( connection );
  console.log('Producer connected via:', socketMethod + '...');

  // Fire some test work every 10ms
  setInterval( produce, 10 );
}
catch (ex) {
  console.log('Failed to connect Producter via', socketMethod, 'to:', connection);
}

