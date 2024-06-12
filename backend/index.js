require('dotenv').config({ path: require('path').resolve(__dirname, './.env.local') });

const mongoDB = require("./db");
mongoDB();

const express = require('express')
const app = express()

// Using CORS to allow frontend to post the Data on API
var cors = require('cors')
// Enabling Cors for all the Routes
app.use(cors())

// To view the request on body
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


// nodemon server runs the index.js files(node.js) on 3000 Port and give the required response based upon request
// On Port 3000: React app will run
// On Port 5000: nodemon server will run which will handle the requests
app.listen(5000, () => {
  console.log(`Example app listening on port 5000`)
})