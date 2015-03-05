/**
 * Created by vinichenkosa on 05.03.15.
 */
var express = require('express');

module.exports = function () {
    var app = express();
    require('../app/routes/index.server.routes.js')(app);
    return app;
};