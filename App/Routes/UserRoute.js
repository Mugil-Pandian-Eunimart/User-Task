const express = require("express");
const router = express.Router();
const Book = require('../Services/UserRoute/UserRoute');

router.route('/insert').get(function(req,res) {
    Book.transaction_test(req,res);
});

router.route('/user').get(function (req,res) {
    Book.fetchUser(req,res);
});


module.exports = router;