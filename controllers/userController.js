const User = require("../models/user.module");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const passport = require("passport")
const jsonWebToken= require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
  let token = req.query.apiToken;
  if (token) {
    User.findOne({ apiToken: token })
        .then(user => {
          if (user) next();
          else next(new Error("Invalid API token."));
        })
        .catch(error => {
          next(new Error(error.message));
        });
  } else {
    next(new Error("Invalid API token."));
  }
};

exports.apiAuthenticate = (req, res, next) => {
  passport.authenticate("local", (errors, user) => {
    if (user) {
      let signedToken = jsonWebToken.sign(
          {
            data: user._id,
            exp: new Date().setDate(new Date().getDate() + 1)
          },
          "secret_encoding_passphrase"
      );
      res.json({
        success: true,
        token: signedToken
      });
    } else
      res.json({
        success: false,
        message: "Could not authenticate user."
      });
  })(req, res, next);
};

exports.verifyJWT = (req, res, next) => {
  let token = req.headers.token;
  if (token) {
    jsonWebToken.verify(
        token,
        "secret_encoding_passphrase",
        (errors, payload) => {
          if (payload) {
            User.findById(payload.data).then(user => {
              if (user) {
                next();
              } else {
                res.json({
                  error: true,
                  message: "No User account found."
                });
              }
            });
          } else {
            res.json({
              error: true,
              message: "Cannot verify API token."
            });
            next();
          }
        }
    );}
  else {
    res.json({
      error: true,
      message: "Provide Token Please"
    });
  }
};

exports.addUser = (req, res) => {
  res.render("signUp");
};

exports.getAllUser = (req, res) => {
  User.find({})
    .exec()
    .then((users) => {
      if (req.query.format === "json") {
        return res.json(users); // respond with JSON
      }
      res.render("users", {
        users: users,
        flashMessages: req.flash() // Pass flash messages to the template
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


exports.saveUser = async (req, res) => {
  try {
    let newUser = new User({
      username: req.body.username,
      //password: req.body.password,
    });

    const user = await User.register(newUser, req.body.password);

    console.log("success", `${user.username}'s account created successfully!`);
    req.flash("success", `${user.username}'s account created successfully!`);
    res.redirect('/users/' + user.username);
  } catch (error) {
    console.log("error", `Failed to create user account because: ${error.message}.`);
    req.flash("error", `Failed to create user account because: ${error.message}.`);
    res.redirect("/users/signup");
  }
};


exports.authenticate = passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login.",
    successFlash: "Logged in!"
});

exports.redirectAfterLogin = (req, res) => {
  res.redirect("/users/" + req.user.username);
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndRemove(id);
    req.flash('success', 'Deleting User by ID was successful');
    res.redirect("/users/user");
  } catch (error) {
    req.flash('error', `Error deleting User by ID: ${error.message}`);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const userParams = {
    username: req.body.username,
    //password: req.body.password,
  };
  try {
    await User.findByIdAndUpdate(id, { $set: userParams });
    console.log(`Updating User by ID was successful`);
    res.redirect(`/users/users`);
  } catch (error) {
    console.log(`Error updating User by ID: ${error.message}`);
  }
};

exports.sendReqParam = (req, res) => {
  let username = req.params.username;
  res.send(`This is the profile page for ${username}`);
};

exports.getLogIn = (req, res) => {
  res.render("login");
};
