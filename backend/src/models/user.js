const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: Number,
  name: String,
  photo: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
