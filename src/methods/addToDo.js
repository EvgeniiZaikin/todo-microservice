const joi = require('joi');
const database = require('../database');
const { addToDo } = require('../database/queries');
const { responseMessage, validator } = require('../default');

class AddToDo {
    constructor() {
        this.schema = joi.object({
            title: joi.string().min(1).required(),
        });
    }

    async run(data) {
        const { validate, errorMessage } = await validator.validate(data, this.schema);

        if (validate) {
            await new Promise(resolve => {
                database.database.all(addToDo(data.title), [], error => {
                    if (error) {
                        console.log(`Error with database query: ${ error.message }`);
                        responseMessage.setBadResponse();
                    } else {
                        responseMessage.setSuccessResponse();
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

module.exports = new AddToDo();
