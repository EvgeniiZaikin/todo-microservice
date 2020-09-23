const database = require('../database');
const { getToDoList } = require('../database/queries');
const { responseMessage } = require('../default');

class GetToDoList {
    async run() {
        await new Promise(resolve => {
            database.database.all(getToDoList, [], (error, rows) => {
                if (error) {
                    console.error(`Error with database query: ${ error.message }`);
                    responseMessage.setBadResponse();
                } else if (!rows.length) {
                    console.warn(`Empty result on query getToDoList`);
                    responseMessage.setBadResponse();
                } else {
                    responseMessage.setSuccessResponse(rows);
                }

                resolve();
            });
        });

        return responseMessage.getResponse();
    }
}

module.exports = new GetToDoList();
