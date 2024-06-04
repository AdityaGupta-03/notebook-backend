const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    obj={
        name: "Aditya",
        age: 20,
        gender: "Male"
    }
    res.json(obj);
})

module.exports = router;