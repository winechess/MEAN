/**
 * Created by vinichenkosa on 05.03.15.
 */
var users = require('../controllers/user.server.controller');

module.exports = function (app) {
    app.route('/users').post(users.create).get(users.list);
};