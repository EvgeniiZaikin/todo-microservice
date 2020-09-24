const joi = require('joi');
const database = require('../database');
const { getToDo } = require('../database/queries');
const { responseMessage, validator } = require('../default');

class GetToDo {
    /**
     * @constructor
     */
    constructor() {
        this.schema = joi.object({
            todoId: joi.number().min(1).required(),
        });
    }

    /**
     * @public
     * @param {string} todoId
     * @return { Object } response
     */
    async run(todoId) {
        const valid = new validator();
        const { validate, errorMessage } = await valid.validate({ todoId }, this.schema);

        const response = new responseMessage();

        if (validate) {
            await new Promise(resolve => {
                database.database.all(getToDo(todoId), [], (error, rows) => {
                    if (error) {
                        console.error(`Error with database query: ${ error.message }`);
                        response.setBadResponse();
                    } else if (!rows.length) {
                        console.warn(`Empty result on query getToDo with todoId = ${ todoId }`);
                        response.setBadResponse();
                    } else {
                        response.setSuccessResponse(rows[0]);
                    }

                    resolve();
                });
            });
        } else {
            console.error(errorMessage);
            response.setBadResponse();
        }

        return response.getResponse();
    }
}

module.exports = GetToDo;
