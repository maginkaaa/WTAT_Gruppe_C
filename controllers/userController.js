const User = require("../models/user.module");

exports.getAllUser = (req, res) => {
  User.find({})
    .exec()
    .then((users) => {
      res.render("users", {
        users: users
      });
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.getSignUp = (req, res) => {
  res.render("signUp");
};

exports.saveUser = (req, res) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  newUser.save()
    .then(() => {
      return User.find({}); // Retrieve the updated list of users
    })
    .then((users) => {
      res.render("users", { users });
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.sendReqParam = (req, res) => {
  let username = req.params.username;
  res.send(`This is the profile page for ${username}`);
};

exports.getLogIn = (req, res) => {
  res.render("logIn");
};
