const mongoose = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose')
const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')

var schema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
       
    },
    googleId: String,
    fullName: {
        type: String,
        default: ''
    },
    root:{
        type: String,
        default:''
    }
});



schema.plugin(passportLocalMongoose)


let User = new mongoose.model("User", schema);
//level 5
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
//
module.exports = User;