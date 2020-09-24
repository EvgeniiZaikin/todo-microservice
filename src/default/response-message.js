class ResponseMessage {
    /**
     * @constructor
     */
    constructor() {
        this.response = {
            success: true,
            wrong: false,
            result: [],
        };
    }

    /**
     * @public
     * set bad result for response
     */
    setBadResponse() {
        this.response = {
            success: false,
            wrong: true,
            result: [],
        };
    }

    /**
     * @public
     * set success result for response
     * @param { * } result
     */
    setSuccessResponse(result = []) {
        this.response = {
            success: true,
            wrong: false,
            result,
        };
    }

    /**
     * @public
     * @return { Object } response
     */
    getResponse() {
        return this.response;
    }
}

module.exports = ResponseMessage;
