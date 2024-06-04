const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    obj={
        title: "Headache",
        description: "Go to bed",
        tag: "Hospitalize"
    }
    res.json(obj);
})

module.exports = router;