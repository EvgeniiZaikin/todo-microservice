const joi = require('joi');
const database = require('../database');
const { getToDo } = require('../database/queries');
const { responseMessage } = require('../default');

class GetToDo {
    async run(todoId) {
        try {
            await this.validate(todoId);

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
        } catch (error) {
            console.error(error);
            responseMessage.setBadResponse();
        }

        return responseMessage.getResponse();
    }

    async validate(todoId) {
        const schema = joi.object({
            todoId: joi.number().min(1).required(),
        });

        try {
            await schema.validateAsync({ todoId });
        } catch ({ message }) {
            throw new Error(`Schema not validate! Message: ${ message }`)
        }
    }
}

module.exports = new GetToDo();
