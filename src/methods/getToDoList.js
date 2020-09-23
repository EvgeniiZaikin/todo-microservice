const database = require('../database');
const { getToDoList } = require('../database/queries');

class GetToDoList {
    async run() {
        let success = true, wrong = false;

        const result = await new Promise(resolve => {
            database.database.all(getToDoList, [], (error, rows) => {
                if (error) {
                    console.error(`Error with database query: ${ error.message }`);
                    wrong = true;
                    success = false;
                    resolve(null);
                } else if (!rows.length) {
                    console.warn(`Empty result on query getToDoList`);
                    resolve([]);
                } else {
                    resolve(rows);
                }
            });
        });

        return { success, wrong, result };
    }
}

module.exports = new GetToDoList();
