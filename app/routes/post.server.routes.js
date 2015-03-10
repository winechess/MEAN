/**
 * Created by vinichenkosa on 10.03.15.
 */
var posts = require('../controllers/post.server.controller');

module.exports = function (app) {

    app.route('/posts')
        .get(posts.list)
        .post(posts.create);


};