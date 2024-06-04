const mongoose = require("mongoose");
const mongooseURI = "mongodb://localhost:27017/";

const connectToMongo = () => {
    mongoose.connect(mongooseURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Connection to the DB is Successful");
        })
}

module.exports = connectToMongo;