/**
 * Created by vinichenkosa on 12.03.15.
 */
var passport = require('passport');
var url = require('url');
var VkontakteStrategy = require('passport-vkontakte').Strategy;
var config = require('../config');
var users = require('../../app/controllers/user.server.controller');

module.exports = function () {
    passport.use(new VkontakteStrategy({
        clientID: config.vk.clientID,
        clientSecret: config.vk.clientSecret,
        callbackURL: config.vk.callbackURL,
        passReqToCallback: true,
        profileFields: ['city', 'bdate', 'emails']
    }, function (req, accessToken, refreshToken, profile, done) {

        console.log('VK profile: ', profile);

        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;

        var providerUserProfile = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            fullName: profile.displayName,
            email: profile.emails ? profile.emails[0].value : '',
            username: profile.username,
            provider: 'vk',
            providerId: profile.id,
            providerData: providerData
        };

        users.saveOAuthUserProfile(req, providerUserProfile, done);
    }));
};
