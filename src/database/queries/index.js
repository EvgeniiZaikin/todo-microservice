module.exports = {
    createToDoTable: `
        CREATE TABLE IF NOT EXISTS todos (
            todo_id INTEGER PRIMARY KEY AUTOINCREMENT,
            todo_text TEXT,
            todo_done INTEGER DEFAULT 0
        );
    `,

    getToDoList: `
        SELECT 
            * 
        FROM
            todos
    `,

    addToDo: todoText => `
        INSERT INTO todos (
            todo_text
        ) VALUES (
            "${ todoText }"
        )
    `,

    getToDo: todoId => `
        SELECT
            *
        FROM
            todos
        WHERE
            todo_id = ${ todoId }
    `,
};
