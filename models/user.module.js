const mongoose = require("mongoose");
mongoose.connect(
 "mongodb://localhost:27017/WTAT",
 {useNewUrlParser: true}
);
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: String
  });

const User = mongoose.model('User', userSchema);
module.exports = User;