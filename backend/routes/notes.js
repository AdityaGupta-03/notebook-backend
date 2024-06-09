// Using the user model into the Routes
const Notes = require("../models/Notes.js");

// Using express to handle the requests to server and send the response to the Client
const express = require('express');
const router = express.Router();
const { body, query, validationResult } = require('express-validator');

// Json Web Tokento return the token when user gets created
var jwt = require('jsonwebtoken');

// Fetching the user data by verifying the JSON Token
const fetchUser = require("../middleware/fetchUser");

// Route 1: Get All Notes: GET endpoint "/api/notes/FetchNotes" : For loggedin User only
router.post('/fetchNotes', fetchUser,
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

            let data = {
                user: {
                    id: user._id
                }
            }

            let token = jwt.sign(data, process.env.JWT_SECRET);

            res.json({ token });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Some Error has been occurred");
        }
    }
);

module.exports = router;