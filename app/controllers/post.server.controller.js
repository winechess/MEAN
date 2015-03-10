/**
 * Created by vinichenkosa on 10.03.15.
 */
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var User = mongoose.model('User');

exports.create = function (req, res, next) {

    var post = new Post(req.body);
    User.findById(post.author, function (err, user) {
        if (err) {
            next(err);
        } else {
            post.author = user;
            post.save(function (err) {
                if (err) {
                    return next(err);
                } else {
                    res.json(post);
                }
            });
        }
    });
};

exports.list = function (req, res, next) {
    Post.find().populate('author').exec(function (err, posts) {
        if (err) {
            return next(err);
        } else {
            res.json(posts);
        }
    })
};