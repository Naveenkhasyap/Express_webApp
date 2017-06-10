var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function(nav) {
    "use strict";
    authRouter.route('/signUp')
        .post(
            function(req, res) {
                //console.log(req.body);
                var url =
                    'mongodb://localhost:27017/libraryapp';
                mongodb.connect(url, function(err, db) {
                    var collection = db.collection('users');
                    var user = {
                        userName: req.body.userName,
                        password: req.body.password
                    };
                    collection.insert(user,
                        function(err, results) {
                            req.login(results, function() {
                                console.log(results);
                                res.redirect('/auth/profile');
                            });
                        });
                });

            });
    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/books',
            failureFlash: false
        }), function(req, res) {
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .get(function(req, res) {
            console.log(req.body);
            res.json(req.user);
        });


    return authRouter;
};

module.exports = router;