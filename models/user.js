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

var encKey = process.env.SOME_32BYTE_BASE64_STRING;
var sigKey = process.env.SOME_64BYTE_BASE64_STRING;

userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey });

var User = new mongoose.model('User', schema);
module.exports = User;