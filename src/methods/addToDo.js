const joi = require('joi');
const database = require('../database');
const { addToDo } = require('../database/queries');
const { responseMessage, validator } = require('../default');

class AddToDo {
    /**
     * @constructor
     */
    constructor() {
        this.schema = joi.object({
            title: joi.string().min(1).required(),
        });
    }

    /**
     * @public
     * @param { Object } data
     * @return { Object } response
     */
    async run(data) {
        const valid = new validator();
        const { validate, errorMessage } = await valid.validate(data, this.schema);

        const response = new responseMessage();

        if (validate) {
            await new Promise(resolve => {
                database.database.all(addToDo(data.title), [], error => {
                    if (error) {
                        console.log(`Error with database query: ${ error.message }`);
                        response.setBadResponse();
                    } else {
                        response.setSuccessResponse();
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

module.exports = AddToDo;
