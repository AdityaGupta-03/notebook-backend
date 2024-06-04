const mongoDB = require("./db");
mongoDB();

const express = require('express')
const app = express()
const port = 3000

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


// on Port No. 3000, Nodejs server should run and from there request is handled and response is thrown
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})