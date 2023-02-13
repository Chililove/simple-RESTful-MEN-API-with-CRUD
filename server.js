const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

// import routes products
const artRoutes = require("./routes/art");
const authRoutes = require("./routes/auth");

require("dotenv-flow").config();

// parse json request
app.use(bodyParser.json());



mongoose.connect(
    process.env.DBHOST, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
).catch(error => console.log("Error connecting to MongoDB:" + error));

mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

// route
app.get("/api/welcome", (req, res) => {

    res.status(200).send({message: "Welcome to this api :)"});
    
    })

// put, post, delete
app.use("/api/arts", artRoutes);
app.use("/api/user", authRoutes);

const PORT = process.env.PORT||4000;
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
})
/*const PORT = process.env.PORT||4000;
app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
})*/

module.exports = app;