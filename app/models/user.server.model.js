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
        index: true
    },
    username: {
        type: String,
        trim: true,
        unique: true
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

UserSchema.set('toJSON', {getters: true, virtuals: true});

mongoose.model('User', UserSchema);