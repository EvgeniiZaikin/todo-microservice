const express = require('express');
const bodyParser = require('body-parser');
const { todoRoute, todosRoute } = require('./routes');

class Server {
    /**
     * @constructor
     */
    constructor() {
        this.server = express();
    }

    /**
     * @public
     * start server and set listening 2023 port
     */
    start() {
        this.server.use(bodyParser.json());

        this.server.use('/api/todo', todoRoute);
        this.server.use('/api/todos', todosRoute);

        this.server.listen(3023, error => {
            error && console.log(`Error with starting server: ${ error }`);
            console.log(`Server successfully start!`);
        });
    };

    /**
     * @public
     * stop server
     */
    stop() {
        this.server.close();
    }
}

module.exports = new Server();
