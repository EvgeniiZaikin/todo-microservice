const joi = require('joi');
const database = require('../database');
const { getToDo } = require('../database/queries');
const { responseMessage, validator } = require('../default');

class GetToDo {
    constructor() {
        this.schema = joi.object({
            todoId: joi.number().min(1).required(),
        });
    }

    async run(todoId) {
        const { validate, errorMessage } = await validator.validate({ todoId }, this.schema);

        if (validate) {
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
        } else {
            console.error(errorMessage);
            responseMessage.setBadResponse();
        }

        return responseMessage.getResponse();
    }
}

module.exports = new GetToDo();
