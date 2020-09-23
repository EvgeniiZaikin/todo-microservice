const database = require('../database');
const { addToDo } = require('../database/queries');

class AddToDo {
    run() {
        database.database.all(addToDo("testToDo"), [], error => {
            if (error) {
                console.log(`Error with database query: ${ error.message }`);
            }
        });

        return `Hello from AddToDo class!`;
    }
}

module.exports = new AddToDo();
