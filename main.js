const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Todo = require('./models/todo.js');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/Todos');

const app = express();

app.use(bodyParser.json());
app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})

app.get('/api/todos', async (req, res) => {
    let todos = await Todo.find();
    res.json(todos);
});

app.post('/api/todos', async (req, res) => {
    var todo = {
        // Hack for unique ID
        id: Math.floor( Date.now() / 1000 ),
        title: req.body.title,
        order: req.body.order
    }
    await Todo.create(todo);
    res.json(todo);
});

app.get('/api/todos/:id', async (req, res) => {
    let todos = await Todo.findOne({id: parseInt(req.params.id)});
    res.json(todos);
});

app.put('/api/todos/:id', async (req, res) => {
    await Todo.updateOne(
        {id: parseInt(req.params.id)},
        {title: req.body.title,
        order: req.body.order,
        completed: req.body.completed
        }
    );
    var todo = await Todo.find({id: parseInt(req.params.id)});
    res.json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
    let todos = await Todo.findOne({id: parseInt(req.params.id)});
    await Todo.deleteOne({id: parseInt(req.params.id)});
    res.json(todos);
});

app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});