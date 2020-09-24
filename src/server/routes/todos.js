const express = require('express');
const router = express.Router();

const { getToDoList } = require('../../methods');

router.route('/')
    .get(async (req, res) => {
        const method = new getToDoList();
        const result = await method.run();
        res.send(result)
    });

module.exports = router;
