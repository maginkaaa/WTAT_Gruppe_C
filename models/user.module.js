const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const randToken = require
("rand-token");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  //password: { type: String, required: true }
});
userSchema.pre("save", function(next) {
  let user = this;
  if (!user.apiToken) user.apiToken =
      randToken.generate(16);
  next();
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "username"
});

const User = mongoose.model('User', userSchema);
module.exports = User;
