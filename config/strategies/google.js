/**
 * Created by vinichenkosa on 12.03.15.
 */
var passport = require('passport');
var url = require('url');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('../config');
var users = require('../../app/controllers/user.server.controller');


module.exports = function () {
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL,
            passReqToCallback: true
        },
        function (req, accessToken, refreshToken, profile, done) {

            var providerData = profile._json;
            providerData.accessToken = accessToken;
            providerData.refreshSecret = refreshToken;

            var providerUserProfile = {
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                fullName: profile.displayName,
                username: profile.username,
                email: profile.emails[0].value,
                provider: 'google',
                providerId: profile.id,
                providerData: providerData
            };

            users.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};