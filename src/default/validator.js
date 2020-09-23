class Validator {
    /**
     * @constructor
     */
    constructor() {
        this.result = {
            validate: false,
            errorMessage: `Validator is not used!`
        };
    }

    /**
     * @public
     * allow validate data by schema
     * @param { Object } data
     * @param { Object } schema
     * @return { Object } result of validate
     */
    async validate(data, schema) {
        try {
            await schema.validateAsync(data);
            this._setSuccessValidate();
        } catch ({ message }) {
            this._setBadValidate(message)
        }

        return this._getResult();
    }

    /**
     * @private
     * set bad validate
     * @param { String } errorMessage
     */
    _setBadValidate(errorMessage) {
        this.result = {
            validate: false,
            errorMessage,
        };
    }

    /**
     * @private
     * set success validate
     */
    _setSuccessValidate() {
        this.result = {
            validate: true,
            errorMessage: null,
        };
    }

    /**
     * @private
     * @return { Object } result of validate
     */
    _getResult() {
        return this.result;
    }
}

module.exports = new Validator();
