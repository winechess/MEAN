/**
 * Created by vinichenkosa on 05.03.15.
 */
var users = require('../controllers/user.server.controller');
var passport = require('passport');

module.exports = function (app) {

    app.route('/users')
        .post(users.create)
        .get(users.list);

    app.param('userId', users.userById);
    app.route('/users/:userId')
        .get(users.read)
        .put(users.update)
        .delete(users.delete);

    app.param('username', users.userByUsername);
    app.route('/users/find/by/username/:username')
        .get(users.read);

    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            failureFlash: true
        }));

    app.route('/signout').get(users.signOut);

    app.route('/oauth/facebook').get(passport.authenticate('facebook', {failureRedirect: '/signin', scope: ['email']}));
    app.route('/oauth/facebook/callback').get(passport.authenticate('facebook', {
        failureRedirect: '/signin',
        successRedirect: '/'
    }));
};