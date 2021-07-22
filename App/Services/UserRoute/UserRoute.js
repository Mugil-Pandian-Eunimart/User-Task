const User = require('../../Models/user');
const Promise = require('bluebird');
const knex = require('../../Utils/database').knex;
const Bookshelf = require('bookshelf')(knex);
const Task = require('../../Models/task');
class Book {
    async fetchUser(req,res) {
        try {
            let val = await User.where({ id: req.query.id }).fetch({withRelated: ['tasks'], require: true});
            console.log(val.toJSON());
            return res.json(val);
        } catch (err) {
            return res.status(500).json({ 
                error: true, 
                data: { message: err.message } 
            });
        }
    }

    async transaction_test(req,res) {
        Bookshelf.transaction((t) => {
            return new User({name: req.query.user})
            .save(null, {transacting : t})
            .tap(function(model) {
                return Promise.map([
                    req.body
                ], (info) => {
                    return new Task(info).save({'user_id':model.id},{transacting:t})
                })
            })
        }).then((user)=>{
            console.log("works")
            return res.send(user);
        }).catch((err)=>{
            console.log("err"+err)
        })
    }

}

module.exports = new Book();