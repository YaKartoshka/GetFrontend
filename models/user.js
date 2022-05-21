var mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    root:{
        type: String,
        default:''
    }
});


schema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

var User = new mongoose.model('User', schema);
module.exports = User;