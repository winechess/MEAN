/**
 * Created by vinichenkosa on 05.03.15.
 */
exports.render = function (req, res) {
    res.render('index', {
        title: 'Welcome to EJS',
        userFullName: req.user ? req.user.fullName : ''
    });
};