const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));

const RESPONSES = {
    Ok: 200,
    Created: 201,
    Accepted: 202,
    DeletedNoContent: 204,
    BadContent: 400,
    NotFound: 404,
};

const todos = [
    {
        id: 1,
        name: "Learn CanJS",
        complete: false,
    },
    {
        id: 2,
        name: "Install CanJS",
        complete: true,
    }
];

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

server.get('/api/todos', (_, res) => {
    return res.json(todos.sort((a, b) => a.name.localeCompare(b.name)));
});

server.post('/api/todos', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(RESPONSES.BadContent).json({ error: 'No name provided' });
    }

    const newItem = {
        name,
        complete: false,
        id: todos.length + 1,
    };
    todos.push(newItem);

    return res.status(RESPONSES.Created).json(newItem);
});

server.put('/api/todos/:id', (req, res) => {
    const { name, complete } = req.body;
    const { id: idAsString } = req.params;

    const id = parseInt(idAsString);
    const newIndex = todos.findIndex((t) => t.id === id);
    if (newIndex < 0) {
        return res.status(RESPONSES.NotFound).json({ error: 'Not found'});
    }

    todos[newIndex] = {
        id,
        name,
        complete,
    };

    return res.status(RESPONSES.Accepted).json({ name, complete, id });
});

server.delete('/api/todos/:id', (req, res) => {
    const { id: idAsString } = req.params;
    const id = parseInt(idAsString);
    newTodos = todos.filter((t) => t.id !== id);
    if (newTodos.length !== todos.length) {
        return res.status(RESPONSES.NotFound).json({ error: 'nothing deleted.' });
    }

    return res.status(RESPONSES.DeletedNoContent).json();
});

server.listen(3001, () => {
    console.log('API listening on 3001');
});