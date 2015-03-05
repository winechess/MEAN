/**
 * Created by vinichenkosa on 05.03.15.
 */
var express = require("express");
var app = express();

app.route('/').get(function (req, res) {
    res.send('Hello World!!!');
});

app.listen(3000);
console.log('Server running at http://localhost:3000/');
module.exports = app;