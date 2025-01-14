// Using the user model into the Routes
const Users = require("../models/Users.js");

// Using express to handle the requests to server and send the response to the Client
const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');

// T0 make hash of the Password
const bcrypt = require('bcryptjs');

// Json Web Tokento return the token when user gets created
var jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

// Fetching the user data by verifying the JSON Token
const fetchUser = require("../middleware/fetchUser");



//^ Route 1: Creating user using POST: endpoint "/api/auth/createUser" : No Login required
router.post('/createUser',
    [body('name', "Enter a valid Name").notEmpty(),
    body('email', "Enter a valid Email").isEmail(),
    body('password').isLength({ min: 5 })
    ],
    async (req, res) => {
        // Check for validation errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }

        // Create a new user record from the parameters of request.body
        try {
            // Check whether user email exists already or not
            let user = await Users.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "User with this email already exist" });
            }
            var salt = bcrypt.genSaltSync(10);
            var hash = await bcrypt.hashSync(req.body.password, salt);

            user = await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });

            let data = {
                id: user._id
            }

            console.log('JWT_SECRET:', process.env.JWT_SECRET);

            let token = jwt.sign(data, secret);
            res.json({ token });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//^ Route 2: Checking User Credentials: POST endpoint "/api/auth/login" 
router.post('/login',
    [
        body('email', "Enter a valid Email").isEmail(),
        body('password').notEmpty()
    ],
    async (req, res) => {
        // Check for validation errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }

        // Checking if user has filled correct login credentials
        try {
            // Check whether user email exists already or not
            let user = await Users.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ error: "Please try with correct login credentials" });
            }

            let pwdCompare = await bcrypt.compare(req.body.password, user.password);
            if (!pwdCompare) {
                return res.status(400).json({ error: "Please try with correct login credentials" });
            }

            const payload = {
                id: user._id
            }

            console.log('JWT_SECRET:', process.env.JWT_SECRET);
            
            let token = jwt.sign(payload, secret);
            res.json({ token });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
        }
    }
);

//^ Route 3: Showing details of signedin User: POST endpoint "/api/auth/getUser" : Login Required
router.get('/getUser', fetchUser, async (req, res) => {
    // Check for validation errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }

    // Checking if user has filled correct login credentials
    try {
        let userId = req.user.id;
        // let user = await Users.findById(userId).select("-password");
        let user = await Users.findById(userId).select();
        if (!user) {
            return res.status(400).json({ error: "Kindly Login" });
        }

        res.send(user);

    } catch (err) {
        console.error(err.message);
        res.send(500).send("Internal Server Error");
    }
});

module.exports = router;