/**
 * Created by vinichenkosa on 05.03.15.
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose');
var express = require("./config/express");

var app = express();
var db = mongoose();
app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');
