const database = require('../database');
const { getToDoList } = require('../database/queries');

class GetToDoList {
    run() {
        database.database.all(getToDoList, [], (error, rows) => {
            console.log('!!!', rows);
            if (error) {
                console.log(`Error with database query: ${ error.message }`);
            } else {
                rows.forEach((row) => {
                    console.log(`All is good!`);
                    console.log(row.name);
                });
            }
        });

        return `Hello from GetToDoList class!`;
    }
}

module.exports = new GetToDoList();
