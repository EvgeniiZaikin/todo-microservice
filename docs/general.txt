This is test ToDo microservice basic on node.js.

Stack:
    - node.js
    - express.js
    - sqlite (sqlite3.js)
    - body-parser.js
    - joi.js
    - jsdoc.js
    - jest
    - chai

Start:
    - clone repository with project
    - run  'npm install'
    - run 'npm run start'
    - you can send request with something like postman on 'localhost:3032'

Use:
    - GET `http://localhost:3023/api/todos` - get todos list
    - GET `http://localhost:3023/api/todo/:id` - get current todo by id
    - POST `http://localhost:3023/api/todo` - add new todo with your params

Test:
    - clone repository with project
    - run  'npm install'
    - run 'npm run test'
