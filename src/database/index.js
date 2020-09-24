const sqlite3 = require('sqlite3').verbose();
const { createToDoTable } = require('./queries');

class Database {
    static database = null;

    /**
     * @public
     * init database creating database file
     * @param { Boolean } test if true then database will create in memory else in file
     */
    static init(test = false) {
        this.database = new sqlite3.Database(test ? `:memory:` : `./database.db`, error => {
            if (error) {
                console.log(`Error with database init: ${ error.message }`);
                return;
            }
            console.log(`Database successfully init`);
        });
    }

    /**
     * @public
     * create table todos for work with database
     */
    static createDB() {
        this.database.serialize(() => {
            this.database.run(createToDoTable, error => {
                if (error) {
                    console.log(`Error with createToDoTable: ${ error.message }`);
                }
            });
        });
    }
}

module.exports = Database;
