const { database, server } = require('./src');

database.init();
database.createDB();

const app = new server();
app.start();
