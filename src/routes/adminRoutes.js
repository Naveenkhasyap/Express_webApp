var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var books = [{
        "id": "978-0641723445",
        "cat": ["book", "hardcover"],
        "name": "The Lightning Thief",
        "author": "Rick Riordan",
        "series_t": "Percy Jackson and the Olympians",
        "sequence_i": 1,
        "genre_s": "fantasy",
        "inStock": true,
        "price": 12.50,
        "pages_i": 384
    },
    {
        "id": "978-1423103349",
        "cat": ["book", "paperback"],
        "name": "The Sea of Monsters",
        "author": "Rick Riordan",
        "series_t": "Percy Jackson and the Olympians",
        "sequence_i": 2,
        "genre_s": "fantasy",
        "inStock": true,
        "price": 6.49,
        "pages_i": 304
    },
    {
        "id": "978-1857995879",
        "cat": ["book", "paperback"],
        "name": "Sophie's World : The Greek Philosophers",
        "author": "Jostein Gaarder",
        "sequence_i": 1,
        "genre_s": "fantasy",
        "inStock": true,
        "price": 3.07,
        "pages_i": 64
    },
    {
        "id": "978-1933988177",
        "cat": ["book", "paperback"],
        "name": "Lucene in Action, Second Edition",
        "author": "Michael McCandless",
        "sequence_i": 1,
        "genre_s": "IT",
        "inStock": true,
        "price": 30.50,
        "pages_i": 475
    }
];
var router = function(nav) {
    "use strict";
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url =
                'mongodb://localhost:27017/libraryapp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results) {
                    res.send(results);
                    db.close();
                });
            });
            //res.send('inserting books');
        });

    return adminRouter;
};

module.exports = router;