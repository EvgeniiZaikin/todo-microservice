const express = require('express');
const router = express.Router();

router.route('/test')
    .get((req, res) => res.send('Hello from test route!'));

module.exports = router;
