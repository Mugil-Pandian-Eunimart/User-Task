const User = require('../../Models/user');
const Promise = require('bluebird');
const knex = require('../../Utils/database').knex;
const Bookshelf = require('bookshelf')(knex);
const Task = require('../../Models/task');
class Book {
    
    async transaction_fetch(req,res){
        Bookshelf.transaction((t) => {
            return Promise.resolve(
                User.where({ id: req.query.id }).fetch({withRelated: ['tasks'], require: true},{transacting:t})
            )
        }).then((user)=>{
            return res.json(user)
        }).catch((err)=>{
            console.log(err)
            return res.json(err)
        })
    }
    async transaction_insert(req,res) {
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
            console.log("Inserted")
            return res.send(user);
        }).catch((err)=>{
            console.log("err"+err)
        })
    }

    async transaction_update(req,res) {
        Bookshelf.transaction((t)=>{
            return User.forge({id:req.query.id,name:req.body.name})
            .save()
            .tap(function(model) {
                return Promise.map([
                    req.body.tasks
                ],(info)=>{
                    return new Task(info).save({'user_id':model.id},{transacting:t})
                })
            })
        }).then((user)=>{
            console.log("Updated")
            return res.send(user);
        }).catch((err)=>{
            console.log("err"+err)
        })
    }

    async transaction_delete(req,res) {
        Bookshelf.transaction((t) => {
            return Promise.resolve(
                User.forge({id:req.query.id})
                .fetch({require:true},{transacting:t})
                .then(function(row){
                    return row.destroy({transacting:t});
                })
            )
        }).then((user) => {
            res.status(200).send({error:false,data:"record deleted"})
        }).catch((err)=>{
            console.log(err)
        })
    }

}

module.exports = new Book();