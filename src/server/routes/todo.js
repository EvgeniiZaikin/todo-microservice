const express = require('express');
const router = express.Router();

const { addToDo } = require('../../methods');

router.route('/')
    .post((req, res) => {
        addToDo.run();
    });

module.exports = router;
