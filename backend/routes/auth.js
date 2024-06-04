const mongoDB = require("./db");
mongoDB();

const express = require('express')
const router = express.Router();

router.get('/api/auth', (req, res) => {
    obj={
        name: "Aditya",
        age: 20,
        gender: "Male"
    }
    res.json(obj);
})

module.exports = router;