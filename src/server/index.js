const express = require('express');

class Server {
    constructor() {
        this.server = express();
    }

    start() {
        this.server.get('*', (req, res) => res.send('Hello!'));
        this.server.listen(3023, error => {
            error && console.log(`Error with starting server: ${ error }`);
        });
    };
}

module.exports = new Server();
