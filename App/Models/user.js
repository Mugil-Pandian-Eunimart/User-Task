const knex = require('../Utils/database').knex;
const bookshelf = require('bookshelf')(knex);
const Task = require('./task');

const User = bookshelf.Model.extend({
    tableName: 'users',
    tasks: function() {
        return this.hasOne(Task);
      }
});

module.exports = User;