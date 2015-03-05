/**
 * Created by vinichenkosa on 05.03.15.
 */
var config = require('./config');
var mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);
    return db;
};