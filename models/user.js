var mongoose = require('mongoose');
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
var User = new mongoose.model('User', schema);
module.exports = User;