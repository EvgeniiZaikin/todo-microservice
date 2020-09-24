const express = require('express');
const router = express.Router();

const { addToDo, getToDo } = require('../../methods');

router.route('/:id')
    .get(async (req, res) => {
        const method = new getToDo();
        const result = await method.run(req.params.id);
        res.send(result);
    });

router.route('/')
    .post(async (req, res) => {
        const method = new addToDo();
        const result = await method.run(req.body);
        res.send(result);
    });

module.exports = router;
