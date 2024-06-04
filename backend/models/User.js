const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  date: { type: Date, default: Date.now }
});

// Create the Note model
const Note = mongoose.model('User', userSchema);
