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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})