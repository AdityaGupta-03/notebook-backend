// Using these models inside routes to interact with DB
const mongoose = require("mongoose");

// Define the Note schema
const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
  title: { type: String, required: true },
  description: String,
  tag: { type: String, default: "General" },
  date: { type: Date, default: Date.now }
});

// Create the Notes model
const Notes = mongoose.model('notes', noteSchema);

// Create Index means creating primary key from the given keys if you make it unique
// Notes.createIndexes();

module.exports = Notes