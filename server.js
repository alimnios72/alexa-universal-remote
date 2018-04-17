/**
 * Created by jorge on 4/1/18.
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var routes = require('./api/routes/main');
routes(app);

app.listen(port);

console.log('alexaremotecontroler started on: ' + port);