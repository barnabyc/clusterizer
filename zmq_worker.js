var zmq          = require('zmq')
  , socketMethod = 'pull'
  , sock         = zmq.socket( socketMethod )
  , connection   = 'tcp://127.0.0.1:9987' // 'ipc:///tmp/feeds0'
  , counter      = 0
  , priorTimestmap = process.hrtime()
  , consume;

consume = function (message) {
  var diff;

  // console.log(
  //   'received work: %s '
  //   + '-['
  //     + hrt.join('.')
  //   + ']-',
  //   message.toString()
  // );

  counter++;

  if (counter % 100 === 0) {
    diff = process.hrtime( priorTimestmap );

    console.log( 'Work counter:', counter, diff.join('.') );

    priorTimestmap = process.hrtime();
  }
};

try {
  sock.connect( connection );
  console.log('Worker connected via:', socketMethod + '...');

  // Listen for messages and hand them to `consume`
  sock.on( 'message', consume );
}
catch (ex) {
  console.log('Failed to connect Worker via', socketMethod, 'to:', connection);
}

