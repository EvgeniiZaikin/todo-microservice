const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { database, server } = require('./src');

beforeAll(async done => {
    database.init(true);
    server.start();
    setTimeout(() => {
        done();
    }, 1500);
});

afterAll(async done => {
    database.database.close();
    server.stop();
    setTimeout(() => {
        done();
    }, 1500);
});

describe(`API tests`, () => {
    test(`Add new todo`, done => {
        chai.request(server.server)
            .post(`/api/todo`)
            .send({ title: `test todo` })
            .end((error, response) => {
                expect(response.statusCode).toBe(200);
                // console.log(response.statusCode);
                done();
            });
    });

    test(`Get current todo`, done => {
        chai.request(server.server)
            .get(`/api/todo/1`)
            .end((error, response) => {
                expect(response.body).toStrictEqual({
                    success: true,
                    wrong: false,
                    result: { todo_id: 1, todo_text: 'test todo', todo_done: 0 }
                });
                done();
            });
    });

    test(`Add new todo`, done => {
        chai.request(server.server)
            .post(`/api/todo`)
            .send({ title: `test #2 todo` })
            .end((error, response) => {
                expect(response.statusCode).toBe(200);
                // console.log(response.statusCode);
                done();
            });
    });

    test(`Get todos list`, done => {
        chai.request(server.server)
            .get(`/api/todos`)
            .end((error, response) => {
                expect(response.body).toStrictEqual({
                    success: true,
                    wrong: false,
                    result: [
                        { todo_id: 1, todo_text: 'test todo', todo_done: 0 },
                        { todo_id: 2, todo_text: 'test #2 todo', todo_done: 0 }
                    ]
                });
                done();
            });
    });

    test(`Wrong (without params.title) add new todo`, done => {
        chai.request(server.server)
            .post(`/api/todo`)
            .send({})
            .end((error, response) => {
                expect(response.body).toStrictEqual({
                    success: false,
                    wrong: true,
                    result: []
                });
                done();
            });
    });

    test(`Wrong (wrong type params.title) add new todo`, done => {
        chai.request(server.server)
            .post(`/api/todo`)
            .send({ title: 123 })
            .end((error, response) => {
                expect(response.body).toStrictEqual({
                    success: false,
                    wrong: true,
                    result: []
                });
                done();
            });
    });

    test(`Wrong (wrong type params.title) get current todo`, done => {
        chai.request(server.server)
            .get(`/api/todo/true`)
            .end((error, response) => {
                expect(response.body).toStrictEqual({
                    success: false,
                    wrong: true,
                    result: []
                });
                done();
            });
    });
});
