const express = require('express');
const bodyParser = require('body-parser');
const { todoRoute, todosRoute } = require('./routes');

class Server {
    constructor() {
        this.server = express();
    }

    start() {
        this.server.use(bodyParser.json());

        this.server.use('/api/todo', todoRoute);
        this.server.use('/api/todos', todosRoute);

        this.server.listen(3023, error => {
            error && console.log(`Error with starting server: ${ error }`);
            console.log(`Server successfully start!`);
        });
    };
}

module.exports = new Server();
