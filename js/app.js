var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(2605, function () {
  console.log('Example app listening on port 2605!');
});

app.use(express.static('markdown'));