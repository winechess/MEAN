/**
 * Created by vinichenkosa on 05.03.15.
 */
var users = require('../controllers/user.server.controller');

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


};