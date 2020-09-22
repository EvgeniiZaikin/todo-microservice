const sqlite3 = require('sqlite3').verbose();
const { createToDoTable } = require('./queries');

class Database {
    init() {
        this.database = new sqlite3.Database('./database.db', error => {
            if (error) {
                console.log(`Error with database init: ${ error.message }`);
                return;
            }
            console.log(`Database successfully init`);

            this.database.serialize(() => {
                this.database.each(createToDoTable, error => {
                    if (error) {
                        console.log(`Error with createToDoTable: ${ error.message }`);
                    }
                });
            });
        });
    }
}

module.exports = new Database();
