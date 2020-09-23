const database = require('../database');
const { getToDo } = require('../database/queries');

class GetToDo {
    async run(todoId) {
        let success = true, wrong = false;

        const result = await new Promise(resolve => {
            database.database.all(getToDo(todoId), [], (error, rows) => {
                if (error) {
                    console.error(`Error with database query: ${ error.message }`);
                    wrong = true;
                    success = false;
                    resolve(null);
                } else if (!rows.length) {
                    console.warn(`Empty result on query getToDo with todoId = ${ todoId }`);
                    resolve(null);
                } else {
                    resolve(rows[0]);
                }
            });
        });

        return { success, wrong, result };
    }
}

module.exports = new GetToDo();
