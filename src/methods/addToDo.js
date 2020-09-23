const joi = require('joi');
const database = require('../database');
const { addToDo } = require('../database/queries');
const { responseMessage } = require('../default');

class AddToDo {
    async run(data) {
        try {
            await this.validate(data);

            await new Promise(resolve => {
                database.database.all(addToDo(data.title), [], error => {
                    if (error) {
                        console.log(`Error with database query: ${ error.message }`);
                        responseMessage.setBadResponse();
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

    async validate(data) {
        const schema = joi.object({
            title: joi.string().min(1).required(),
        });

        try {
            await schema.validateAsync(data);
        } catch ({ message }) {
            throw new Error(`Schema not validate! Message: ${ message }`)
        }
    }
}

module.exports = new AddToDo();
