const sqlite3 = require('sqlite3').verbose();

class Database {
    init() {
        this.database = new sqlite3.Database('./database.db', error => {
            if (error) console.log(`Error with database init: ${ error.message }`);
            else console.log(`Database successfully init`);
        });
    }
}

module.exports = new Database();
