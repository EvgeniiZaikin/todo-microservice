class Validator {
    constructor() {
        this.result = {
            validate: false,
            errorMessage: `Validator is not used!`
        };
    }

    async validate(data, schema) {
        try {
            await schema.validateAsync(data);
            this._setSuccessValidate();
        } catch ({ message }) {
            this._setBadValidate(message)
        }

        return this._getResult();
    }

    _setBadValidate(errorMessage) {
        this.result = {
            validate: false,
            errorMessage,
        };
    }

    _setSuccessValidate() {
        this.result = {
            validate: true,
            errorMessage: null,
        };
    }

    _getResult() {
        return this.result;
    }
}

module.exports = new Validator();
