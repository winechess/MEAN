/**
 * Created by vinichenkosa on 05.03.15.
 */
var User = require('mongoose').model('User');
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
    User.find({}, 'username email', {/*skip: 10, limit: 10*/}, function (err, users) {
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