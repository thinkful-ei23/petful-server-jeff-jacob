const express = require('express');
const dogQueue = require('./../models/dog');
const router = express.Router();



router.get('/', (req, res, next) => {
    const dogObj = dogQueue.first.value;
    res.json(dogObj);
});

router.delete('/', (req, res, next) => {
    dogQueue.dequeue();
    res.status(204)
        .end();
})


module.exports = router;
