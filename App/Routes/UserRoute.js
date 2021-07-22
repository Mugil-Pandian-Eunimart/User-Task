const express = require("express");
const router = express.Router();
const Book = require('../Services/UserRoute/UserRoute');

router.route('/user').get(function (req,res) {
    Book.transaction_fetch(req,res);
})
.post(function(req,res) {
    Book.transaction_insert(req,res);
})
.put(function(req,res){
    Book.transaction_update(req,res);
})
.delete(function(req,res){
    Book.transaction_delete(req,res);
});

router.route('/test').get(function(req,res){
    Book.transaction_fetch(req,res);
})

module.exports = router;