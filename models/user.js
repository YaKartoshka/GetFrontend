const mongoose = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose')
const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')
var schema = new mongoose.Schema({
    username:{
        type: String,
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

schema.plugin(findOrCreate)
let User = new mongoose.model("User", schema);

passport.use(User.createStrategy())

passport.serializeUser(function (user, done) {
    done(null, user.id)
})
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err,user)
    })
})


passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:4000/auth/google/index"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));
module.exports = User;