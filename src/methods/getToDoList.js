const database = require('../database');
const { getToDoList } = require('../database/queries');
const { responseMessage } = require('../default');

class GetToDoList {
    /**
     * @public
     * @return { Object } response
     */
    async run() {
        const response = new responseMessage();

        await new Promise(resolve => {
            database.database.all(getToDoList, [], (error, rows) => {
                if (error) {
                    console.error(`Error with database query: ${ error.message }`);
                    response.setBadResponse();
                } else if (!rows.length) {
                    console.warn(`Empty result on query getToDoList`);
                    response.setBadResponse();
                } else {
                    response.setSuccessResponse(rows);
                }

                resolve();
            });
        });

        return response.getResponse();
    }
}

module.exports = GetToDoList;
