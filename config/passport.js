/**
 * Created by vinichenkosa on 11.03.15.
 */
var mongoose = require('mongoose');
var passport = require('passport');

module.exports = function () {

    var User = mongoose.model('User');

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, '-salt -password', function (err, user) {
            done(err, user);
        });
    });

    require('./strategies/local')();
    require('./strategies/facebook')();
    require('./strategies/twitter')();
    require('./strategies/google')();
    require('./strategies/vk')();
};