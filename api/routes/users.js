const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.json({
        message: "user route connected"
    });
});

module.exports = router;