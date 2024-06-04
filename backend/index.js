const mongoDB = require("./db");

mongoDB();
const express = require('express')
const app = express()
const port = 3000

// If I directly localhost:3000/ 
// In response we will get Hello Aditya Gupta
app.get('/', (req, res) => {
  res.send('Hello Aditya Gupta')
})

// on Port No. 3000, Nodejs server should run and from there request is handled and response is thrown
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})