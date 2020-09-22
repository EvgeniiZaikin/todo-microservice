const express = require('express');
const router = express.Router();

const { getToDoList } = require('../../methods');

router.route('/test')
    .get((req, res) => {
        const text = getToDoList.run();
        res.send(text)
    });

module.exports = router;
