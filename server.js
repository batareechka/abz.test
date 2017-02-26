var path = require('path');
var express = require('express');

var staticPath = path.normalize(__dirname + '/dist'),
    app = express(),
    server = app.listen(3060);

app.use(express.static(staticPath));

module.exports = app;