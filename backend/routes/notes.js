const mongoDB = require("./db");
mongoDB();

const express = require('express')
const router = express.Router();

router.get('/api/notes', (req, res) => {
    obj={
        title: "Headache",
        description: "Go to bed",
        tag: "Hospitalize"
    }
    res.json(obj);
})

module.exports = router;