/**
 * Created by vinichenkosa on 05.03.15.
 */
exports.render = function (req, res) {
    //if (req.session.lastVisit) {
    //    console.log(req.session.lastVisit);
    //}
    //req.session.lastVisit = new Date();
    //console.log(req.user);
    res.render('index', {
        title: 'Welcome to EJS',
        userFullName: req.user ? req.user.fullName : ''
    });
};