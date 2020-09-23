const joi = require('joi');
const database = require('../database');
const { addToDo } = require('../database/queries');

class AddToDo {
    async run(data) {
        let success = true, wrong = false;

        try {
            await this.validate(data);
        } catch (error) {
            console.error(error);
            wrong = true;
            success = false;
        }

        await new Promise(resolve => {
            database.database.all(addToDo(data.title), [], error => {
                if (error) {
                    console.log(`Error with database query: ${ error.message }`);
                    wrong = true;
                    success = false;
                }
                resolve();
            });
        });

        return { success, wrong };
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
