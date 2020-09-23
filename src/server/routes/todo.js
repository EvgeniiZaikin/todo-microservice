const express = require('express');
const router = express.Router();

const { addToDo, getToDo } = require('../../methods');

router.route('/:id')
    .get((req, res) => {
        getToDo.run();
    });

router.route('/')
    .post((req, res) => {
        addToDo.run();
    });

module.exports = router;
