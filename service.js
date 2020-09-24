const { database, server } = require('./src');

database.init();
database.createDB();

server.start();
