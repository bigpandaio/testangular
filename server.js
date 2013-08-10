var express = require('express');
var app = express();

// Must be configured to parse incoming JSON
app.use(express.bodyParser());

// Serves files of our Angular.JS application
app.use(express.static(__dirname + '/public'));

app.post('/login', function(req, res){
  var password = req.body.password;
  if(password == 'testangular') {
    res.send(200);
  } else {
    res.send(401);
  }

});

app.listen(3000);
console.log('Listening on port 3000');
