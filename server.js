var express = require('express');
var app = express();

// Must be configured to parse incoming JSON
app.use(express.bodyParser());

// Log incoming requests
app.use(express.logger('dev'));

// Serves files of our Angular.JS application
app.use(express.static(__dirname + '/public'));

// Enable cross-domain calls
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
});

// Required for cross-domain validation
app.options('/login', function(req, res) { res.send(200)});

// Finally... our /login endpoint
app.post('/login', function(req, res){
  var password = req.body.password;
  if(password == 'testangular') {
    res.send(200);
  } else {
    res.send(401);
  }

});

// Listen on port 8000
app.listen(8000);
console.log('Listening on port 8000');
