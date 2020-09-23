const express = require('express');
const router = express.Router();

const { getToDoList } = require('../../methods');

router.route('/')
    .get(async (req, res) => {
        const result = await getToDoList.run();
        res.send(result)
    });

module.exports = router;
