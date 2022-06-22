const express = require('express');
const router = express.Router();

router.get('/goals', (req, res) => {
    res.status(200).send('Goals')
});
module.exports = router;