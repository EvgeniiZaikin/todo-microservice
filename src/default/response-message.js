class ResponseMessage {
    constructor() {
        this.response = {
            success: true,
            wrong: false,
            result: [],
        };
    }

    setBadResponse() {
        this.response = {
            success: false,
            wrong: true,
            result: [],
        };
    }

    setSuccessResponse(result = []) {
        this.response = {
            success: true,
            wrong: false,
            result,
        };
    }

    getResponse() {
        return this.response;
    }
}

module.exports = new ResponseMessage();
