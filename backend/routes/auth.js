// Using the user model into the Routes
const User = require("../models/User");

// Using express to handle the requests to server and send the response to the Client
const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');

// TO make hash of the Password
const bcrypt = require('bcryptjs');

// Json Web Tokento return the token when user gets created
var jwt = require('jsonwebtoken');

// Creating user using: POST endpoint "/api/auth/createUser" : No Login required
router.post('/createUser',
    body('name', "Enter a valid Name").notEmpty(),
    body('email', "Enter a valid Email").isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        // Check for validation errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }

        // Create a new user record from the parameters of request.body

        try {
            // Check whether user email exists already or not
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "User with this email already exist" });
            }
            var salt = bcrypt.genSaltSync(10);
            var hash = await bcrypt.hashSync(req.body.password, salt);

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });

            let data={
                user:{
                    id: user._id
                }
            }
            let JWT_KEY = "edghWQIRUSjisfe";
            let token = jwt.sign(data, JWT_KEY);

            res.json({token});
        } catch (err) {
            console.error(err.message);
            res.send(500).send("Some Error has been occurred");
        }
    }
);


// Creating user using: POST endpoint "/api/auth/login" 
router.post('/login',
    body('email', "Enter a valid Email").isEmail(),
    body('password').notEmpty(),
    async (req, res) => {
        // Check for validation errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }

        // Checking if user has filled correct login credentials
        try {
            // Check whether user email exists already or not
            let user = await User.findOne({email: req.body.email});
            if (!user) {
                return res.status(400).json({ error: "Please try with correct login credentials" });
            }
           
            let pwdCompare = await bcrypt.compare(req.body.password, user.password);
            if(!pwdCompare){
                return res.status(400).json({ error: "Please try with correct login credentials" });
            }

            const payload={
                user:{
                    id: user._id
                }
            }
            let JWT_KEY = "edghWQIRUSjisfe";
            let token = jwt.sign(payload, JWT_KEY);

            res.json({token});
        } catch (err) {
            console.error(err.message);
            res.send(500).send("Some Error has been occurred");
        }
    }
);

module.exports = router;