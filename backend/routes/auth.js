const express = require('express')
const User = require("../models/User");
const router = express.Router();

// Using the user model into the Routes
// Create user using: POST endpoint"/api/auth""
router.get('/', (req, res) => {
    // Printing the body content on the server console
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
})

module.exports = router;