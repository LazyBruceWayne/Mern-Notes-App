var passport = require('passport');
var PassportFacebookStrategy = require('passport-facebook').Strategy;
const User = require('mongoose').model('User');
const config = require('../../config');
const jwt = require('jsonwebtoken');

module.exports = new PassportFacebookStrategy({
    clientID: config.FB_ID,
    clientSecret: config.FB_Secret,
    callbackURL: '#',
    profileFields: ['id', 'email', 'gender', 'profileUrl', 'displayName']
}, (accessToken, refreshToken, profile, done) => {
    process.nextTick(function() {
        User.findOne({ 'providerID': profile.id }, function(err, user) {
            if (err) {
                return done(err);
            } else if (user) {
                console.log("Found user");
                //console.log(user);
                return done(null, user);
            } else {
                console.log("Create user");
               

                const userData = {
                    email: profile.emails,
                    password: "",
                    name: profile.displayName,
                    provider: "Facebook",
                    providerID: profile.id
                };
                
                var newUser = new User(userData);

                //console.log(newUser);
                const payload = {
                        sub: newUser._id
                    };
                const token = jwt.sign(payload, config.jwtSecret);
                newUser.jwtToken = token;

                newUser.save(function(err) {
                    if (err) throw err;
                    return done(null, newUser);
                })
            }
        })
    })
    //return done(null, profile);
});
