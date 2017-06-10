var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;
module.exports = function() {
    "use strict";
    passport.use(new LocalStrategy({
            userNameField: 'userName',
            passwordField: 'password'
        },
        function(userName, password, done) {
            var url =
                'mongodb://localhost:27017/libraryapp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                collection.findOne({
                    userName: userName
                }, function(err, results) {
                    if (results.password === password) {
                        var user = results;
                        done(null, user);
                    } else {
                        done(null, false, { message: 'Bad password' });

                    }
                });
            });
        }
    ));
};