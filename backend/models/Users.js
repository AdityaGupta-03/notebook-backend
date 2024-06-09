// Using these models inside routes to interact with DB
const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  date: { type: Date, default: Date.now }
});

// Create the users model
const User = mongoose.model('users', userSchema);

// Create Index means creating primary key from the given keys if you make it unique
// Notes.createIndexes();

module.exports = User;