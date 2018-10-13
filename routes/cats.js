const express = require('express');
const catQueue = require('./../models/cat');
const router = express.Router();


router.get('/', (req, res, next) => {
    const catObj = catQueue.first.value;
    res.json(catObj);
});

router.delete('/', (req, res, next) => {
    catQueue.dequeue();
    res.status(204)
        .end();
})


module.exports = router;










