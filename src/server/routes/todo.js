const express = require('express');
const router = express.Router();

const { addToDo, getToDo } = require('../../methods');

router.route('/:id')
    .get(async (req, res) => {
        const result = await getToDo.run(req.params.id);
        res.send(result);
    });

router.route('/')
    .post((req, res) => {
        addToDo.run();
    });

module.exports = router;
