var goodreadService = function() {
    "use strict";
    var getBookById = function(id, cb) {
        cb(null, { description: "our description" });
    };
    return {
        getBookById: getBookById
    };
};

module.exports = goodreadService;