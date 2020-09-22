const { database, server } = require('./src');

database.init();
server.start();
