//Main starting point of app
//npm packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

//importing file
const router = require("./router");
const secret = require("./config/secret");
//Model
require("./models/user");

const app = express();

//DB SETUP
mongoose.connect(secret.mongoURI, { useNewUrlParser: true }, () =>
  console.log("Connected to db..")
);

//APP SETUP
//Middleware - Incoming req to Server are passed to middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
router(app);

//SERVER SETUP
//PORT => constant that shouldn't be changed frequently
const PORT = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${PORT}`);
});
