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

//^ Route 1: Fetching All Notes: GET endpoint "/api/notes/FetchNotes" : For loggedin User only
router.post('/fetchNotes',
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

            let token = jwt.sign(payload, process.env.JWT_SECRET);
            res.json({ token });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Error while login request");
        }
    }
);

//^ Route 2: Submitting Note: POST endpoint "/api/notes/newNote" : For loggedin User only
router.post('/newNote',
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

            let token = jwt.sign(payload, process.env.JWT_SECRET);
            res.json({ token });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Error while login request");
        }
    }
);

//^ Route 3: Updating Notes: POST endpoint "/api/notes/updateNote" : For loggedin User only
router.post('/updateNote',
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

            let token = jwt.sign(payload, process.env.JWT_SECRET);
            res.json({ token });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Error while login request");
        }
    }
);

//^ Route 4: Deleting Notes: POST endpoint "/api/notes/deleteNote" : For loggedin User only
router.post('/deleteNote',
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

            let token = jwt.sign(payload, process.env.JWT_SECRET);
            res.json({ token });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Error while login request");
        }
    }
);

module.exports = router;