const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "profile route connected"
    });
});

module.exports = router;