const express = require('express');
const { todoRoute, todosRoute } = require('./routes');

class Server {
    constructor() {
        this.server = express();
    }

    start() {
        this.server.use('/api/todo', todoRoute);
        this.server.use('/api/todos', todosRoute);

        this.server.get('*', (req, res) => res.send('Hello!'));

        this.server.listen(3023, error => {
            error && console.log(`Error with starting server: ${ error }`);
        });
    };
}

module.exports = new Server();
