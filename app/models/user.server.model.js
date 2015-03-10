/**
 * Created by vinichenkosa on 05.03.15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true,
        match: /.+\@.+\..+/
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: String,
    created: {
        type: Date,
        default: Date.now()
    },
    website: {
        type: String,
        get: function (url) {

            if (url && url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                url = "http://" + url;
            }
            return url;
        }
    }

});
//virtual fields
UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

//custom static methods
UserSchema.statics.findOneByUsername = function (username, callback) {
    this.findOne({username: new RegExp(username, 'i')}, callback);
};

//custom instance methods
UserSchema.methods.authenticate = function (password) {
    return this.password === password;
};

UserSchema.set('toJSON', {getters: true, virtuals: true});

mongoose.model('User', UserSchema);