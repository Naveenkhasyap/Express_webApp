var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
//var bookService = require('../services/goodreadservices.js');
var bookController = function(bookService, nav) {
    "use strict";
    var middleware = function(req, res, next) {
        if (!req.user) {
            //res.redirect('/');
        }
        next();
    };
    var getIndex = function(req, res) {
        "use strict";
        var url =
            'mongodb://localhost:27017/libraryapp';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(
                function(err, results) {
                    res.render('booksList', {
                        title: 'Books',
                        nav: nav,
                        books: results
                    });
                }
            );
        });

    };


    var getById = function(req, res) {
        "use strict";
        var id = new objectId(req.params.id);
        var url =
            'mongodb://localhost:27017/libraryapp';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');
            collection.findOne({ _id: id },
                function(err, results) {
                    bookService.getBookById(results.bookId,
                        function(err, book) {
                            results.book = book;
                            res.render('bookView', {
                                title: 'Books',
                                nav: nav,
                                books: results
                            });
                        });

                }
            );

        });
    };


    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };

}

module.exports = bookController;