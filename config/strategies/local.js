/**
 * Created by vinichenkosa on 11.03.15.
 */
var User = require('mongoose').model('User');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


module.exports = function () {
    passport.use(new LocalStrategy(function (username, password, done) {
        User.findOne({username: username}, function (err, user) {

            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {message: 'Unknown user'});
            }

            if (!user.authenticate(password)) {
                return done(null, false, {message: 'Invalid password'});
            }

            return done(null, user);
        });
    }));
}
