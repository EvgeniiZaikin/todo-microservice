const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

class Tester {
    /**
     * @constructor
     */
    constructor(server, database) {
        this.server = server;
        this.database = database;
    }

    /**
     * @public
     * run test GET method current url API
     * @param { String } label test name
     * @param { String } endpoint API url
     * @param { Object } expected expected test result
     */
    testGetCase(label, endpoint, expected) {
        test(label, done => {
            chai.request(this.server)
                .get(endpoint)
                .end((error, response) => {
                    expect(response.body).toStrictEqual(expected);

                    done();
                });
        });
    }

    /**
     * @public
     * run test POST method current url API
     * @param { String } label test name
     * @param { String } endpoint API url
     * @param { Object } params
     * @param { Boolean } onlyCode check only statusCode (if true) or response.body (if false)
     * @param { Object | Number } expected expected test result
     */
    testPostCase(label, endpoint, params, onlyCode, expected) {
        test(label, done => {
            chai.request(this.server)
                .post(endpoint)
                .send(params)
                .end((error, response) => {
                    onlyCode ?
                        expect(response.statusCode).toBe(expected) :
                        expect(response.body).toStrictEqual(expected);

                    done();
                });
        });
    }
}

module.exports = Tester;
