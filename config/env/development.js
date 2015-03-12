/**
 * Created by vinichenkosa on 05.03.15.
 */
module.exports = {
    //Development configuration options
    sessionSecret: 'developmentSessionSecret',
    db: 'mongodb://localhost/mean',
    facebook: {
        clientID: '362870707252113',
        clientSecret: '968ff15583f63c0992132c2d94c9f490',
        callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
    twitter: {
        clientID: 'QgoYLkJwA9uV9s6ip0f30pTQP',
        clientSecret: 'ZicO4KXQmKaGoUY3odE0Wi3UrvVQReFqBiom2IcQMpFQeDTXM8',
        callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    },
    google: {
        clientID: '810458430363-ppalfpgp3975m8jr9g1q163mgdsn4lr8.apps.googleusercontent.com',
        clientSecret: 'faZ7q3J0n2bDlNAhl471dQwm',
        callbackURL: 'http://localhost:3000/oauth/google/callback'
    }
};