/**
 * Created by vinichenkosa on 05.03.15.
 */
module.exports = function (app) {
    var index = require('../controllers/index.server.controller');
    app.route('/').get(index.render);
};