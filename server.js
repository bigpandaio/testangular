var express = require('express');
var app = express();

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

app.get('/', function(req, res){
  res.send(200);
});

app.listen(3000);
console.log('Listening on port 3000');
