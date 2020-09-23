const database = require('../database');
const { getToDo } = require('../database/queries');
const { responseMessage } = require('../default');

class GetToDo {
    async run(todoId) {
        await new Promise(resolve => {
            database.database.all(getToDo(todoId), [], (error, rows) => {
                if (error) {
                    console.error(`Error with database query: ${ error.message }`);
                    responseMessage.setBadResponse();
                } else if (!rows.length) {
                    console.warn(`Empty result on query getToDo with todoId = ${ todoId }`);
                    responseMessage.setBadResponse();
                } else {
                    responseMessage.setSuccessResponse(rows[0]);
                }

                resolve();
            });
        });

        return responseMessage.getResponse();
    }
}

module.exports = new GetToDo();
