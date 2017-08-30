const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true},
  title: { type: String, required: true },
  order: { type: Number, required: true },
  completed: { type: Boolean, required: true, default: false}
});

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;