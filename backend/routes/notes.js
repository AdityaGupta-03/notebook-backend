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
router.get('/fetchNotes', fetchUser,
    async (req, res) => {
        try {
            let note = await Notes.find({ user: req.user.id });
            if (!note) {
                return res.status(400).json({ error: "Notes are not present with the mentioned User" });
            }

            res.json(note);

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Error while Fetching Note request");
        }
    }
);

//^ Route 2: Submitting Note: POST endpoint "/api/notes/newNote" : For loggedin User only
router.post('/newNote', fetchUser,
    [
        // Validators in express-validator
        body('title', "Enter title").isLength({ min: 3 }),
        body('description', "Enter Description").notEmpty(),
        body('tag',"Enter tag").notEmpty()
    ],
    async (req, res) => {
        try {
            const note = await new Notes({
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag,
                user: req.user.id
            });

            const savedNote = await note.save();
            res.json(savedNote);

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Error while Creating Note request");
        }
    }
);

//^ Route 3: Updating Notes: PUT endpoint "/api/notes/updateNote/NoteID (params)" : For loggedin User only
router.put('/updateNote/:id', fetchUser,
    async (req, res) => {
        try {
            const {title,description,tag} = req.body;
            const newNote={};

            if(title){
                newNote.title=title;
            }
            if(description){
                newNote.description=description;
            }
            if(tag){
                newNote.tag=tag;
            }

            const note = await Notes.findById(req.params.id);

            if (!note) {
                return res.status(404).send("Not Found");
            }
            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed");
            }

            const updatedNote = await Notes.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, newNote, { new: true });
            if (!updatedNote) {
                return res.status(400).json({ error: "Unable to update the note" });
            }

            res.json(updatedNote);

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Error while updating the note request");
        }
    }
);

//^ Route 4: Deleting Notes: POST endpoint "/api/notes/deleteNote" : For loggedin User only
router.post('/deleteNote',
    async (req, res) => {
        try {

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Error while login request");
        }
    }
);

module.exports = router;