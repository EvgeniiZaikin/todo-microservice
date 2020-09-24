const { database, server, tester } = require('./src');

const app = new server();
const tst = new tester(app.server);

const { responseMessage } = require('./src/default');
const response = new responseMessage();
response.setBadResponse();
const badResponseMessage = response.getResponse()

const api = {
    simple: `/api/todo`,
    simpleWithParams: params => `/api/todo/${ params }`,
    plural: `/api/todos`,
};

beforeAll(async done => {
    database.init(true);
    database.createDB();
    app.start();
    setTimeout(() => {
        done();
    }, 1500);
});

afterAll(async done => {
    database.database.close();
    app.stop();
    setTimeout(() => {
        done();
    }, 1500);
});

describe(`API tests`, () => {
    tst.testPostCase(`Add new todo`, api.simple, { title: `test todo` }, true, 200);

    tst.testGetCase(`Get current todo`, api.simpleWithParams(1), {
        success: true,
        wrong: false,
        result: { todo_id: 1, todo_text: 'test todo', todo_done: 0 }
    });

    tst.testPostCase(`Add new todo`, api.simple, { title: `test #2 todo` }, true, 200);

    tst.testGetCase(`Get todos list`, api.plural, {
        success: true,
        wrong: false,
        result: [
            { todo_id: 1, todo_text: 'test todo', todo_done: 0 },
            { todo_id: 2, todo_text: 'test #2 todo', todo_done: 0 }
        ]
    });

    tst.testPostCase(`Wrong (without params.title) add new todo`, api.simple, {}, false, badResponseMessage);

    tst.testPostCase(`Wrong (wrong type params.title) add new todo`, api.simple, {
        title: 123
    }, false, badResponseMessage);

    tst.testGetCase(`Wrong (wrong type params.title) get current todo`, api.simpleWithParams('true'), badResponseMessage);
});
