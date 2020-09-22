module.exports = {
    createToDoTable: `
        CREATE TABLE IF NOT EXISTS todos (
            todo_id INTEGER PRIMARY KEY,
            todo_text TEXT,
            todo_done INTEGER DEFAULT 0
        );
    `,
};
