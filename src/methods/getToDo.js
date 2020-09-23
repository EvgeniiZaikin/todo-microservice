const database = require('../database');
const { getToDo } = require('../database/queries');

class GetToDo {
    run() {
        database.database.all(getToDo(1), [], (error, rows) => {
            if (error) {
                console.log(`Error with database query: ${ error.message }`);
            } else {
                console.log('ROWS:', rows);
            }
        });

        return `Hello from GetToDo class!`;
    }
}

module.exports = new GetToDo();
