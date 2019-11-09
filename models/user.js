const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true, //same email cant be used for different users
    lowercase: true
  },
  password: String
});

module.exports = mongoose.model("user", userSchema);
