const mongoose = require("mongoose");

// Define the Note schema
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tag: { type: String, default: "General" },
  date: { type: Date, default: Date.now }
});

// Create the Note model
const Note = mongoose.model('Note', noteSchema);

// Using these models inside routes to interact with DB