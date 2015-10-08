var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
  date: Date,
  task: String
});

var Todo = mongoose.model('todo', todoSchema);
module.exports = Todo;