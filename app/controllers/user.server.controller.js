/**
 * Created by vinichenkosa on 05.03.15.
 */
var User = require('mongoose').model('User');
var passport = require('passport');


exports.saveOAuthUserProfile = function (req, profile, done) {
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function (err, user) {
        if (err) {
            return done(err);
        } else {
            if (!user) {
                console.log("USer not found");
                var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');
                console.log("Possible username: " + possibleUsername);
                User.findUniqueUsername(possibleUsername, null, function (availableUsername) {
                    console.log("Available username: " + availableUsername);
                    profile.username = availableUsername;
                    user = new User(profile);
                    user.save(function (err) {
                        if (err) {
                            var message = _this.getErrorMessage(err);
                            req.flash('error', message);
                            return res.redirect('/signup');
                        }
                        return done(err, user);
                    })
                })
            } else {
                console.log("User found with profile.provider = " + profile.provider + " and profile.providerId = " + profile.providerId);
                return done(err, user);
            }
        }
    });
};

var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = "Username already exists";
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var i in err.errors) {
            if (err.errors[i].message) {
                message = err.errors[i].message;
            }
        }
    }
    return message;
};

exports.renderSignin = function (req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in form',
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};

exports.renderSignup = function (req, res, next) {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

exports.signup = function (req, res, next) {
    if (!req.user) {
        var user = new User(req.body);
        user.provider = 'local';

        user.save(function (err) {

            if (err) {
                var message = getErrorMessage(err);
                req.flash('error', message);
                return res.redirect('/signup');
            }

            req.login(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

exports.signOut = function (req, res, next) {
    req.logout();
    res.redirect('/');
};

exports.create = function (req, res, next) {

    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.list = function (req, res, next) {
    User.find({}, {/*skip: 10, limit: 10*/}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    })
};

exports.userById = function (req, res, next, id) {
    User.findById(id, function (err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.read = function (req, res) {
    res.json(req.user);
};

exports.update = function (req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    })
};

exports.delete = function (req, res, next) {
    req.user.remove(function (err) {
        if (err) {
            next(err);
        } else {
            res.json(req.user);
        }
    })
};

exports.userByUsername = function (req, res, next, username) {
    User.findOneByUsername(username, function (err, user) {
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    })
};