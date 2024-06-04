const express = require('express')
const User = require("../models/User");
const router = express.Router();
const { body, query, validationResult } = require('express-validator');

// Using the user model into the Routes
// Create user using: POST endpoint "/api/auth/createUser" : No Login required
router.post('/',
    body('name', "Enter a valid Name").notEmpty(),
    body('email', "Enter a valid Email").isEmail(),
    body('password').isLength({ min: 5 }),
    (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }

        // Create a new user record
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(user=>res.json(user))
        .catch( (err) =>{
            res.status(400).json(err);
        });
    });

module.exports = router;