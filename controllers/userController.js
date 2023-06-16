const User = require("../models/user.module");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");

exports.addUser = (req, res) => {
  res.render("signUp");
};

exports.getAllUser = (req, res) => {
  User.find({})
    .exec()
    .then((users) => {
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


exports.getSignUp = (req, res) => {
  res.render("signUp");
};

exports.saveUser = (req, res, next) => {
  let newUser;
  let users = [];
  bcrypt.hash(req.body.password, 10).then(hash => {   
    newUser = new User({
      username: req.body.username,
      password: hash,
  });
  users.push(newUser);
  newUser.save()

  .then((newUser) => {
    req.flash("success", `${newUser.fullName}'s account created successfully!`);
    res.locals.redirect = "/users";
    res.locals.user = newUser;
    next();
  })
  .then(() => {
    return User.find({}); // Retrieve the updated list of users
  })
  .then(() => {
    res.render("users", { users });
  })
  .catch((error) => {
    console.log(`Error saving user: ${error.message}`);
    req.flash("error", `Failed to create user account because: ${error.message}.`);
    res.locals.redirect = "/users";
    next();
  });

  })
  .then(() => {
    res.render("users", { users });
  })
  .catch(error => { console.log(`Error in hashing password: ${error.message}`); 
  next(error);    });

  
};

exports.authenticate = (req, res, next) => {
    User.findOne({email: req.body.email})
     .then(user => {
       if (user) {
        bcrypt.compare(req.body.password, user.password)
          .then(passwordsMatch => {
             if (passwordsMatch) {
                        res.locals.redirect = `/users/${user._id}`;
                        req.flash("success", `${user.username}'s logged in ➥successfully!`);
                        res.locals.user = user; 
                      }
                      else
                      { 
                          req.flash("error", "Failed to log in user account: ➥Incorrect Password."); 
                          res.locals.redirect = "/users/login"; 
                        } 
                        next(); 
                      }); 
                    } 
                    else 
                    { 
                      req.flash("error", "Failed to log in user account: User ➥account not found."); 
                      res.locals.redirect = "/users/login"; 
                      next();    
                    }  
                  }) 
                  .catch(error => { 
                    console.log(`Error logging in user: ${error.message}`); 
                    next(error); 
                  }); 
                }

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndRemove(id);
    console.log(`Deleting User by ID was successful`);
    res.redirect("/user");
  } catch (error) {
    console.log(`Error deleting User by ID: ${error.message}`);
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const userParams = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    await User.findByIdAndUpdate(id, { $set: userParams });
    console.log(`Updating User by ID was successful`);
    res.redirect(`/user`);
  } catch (error) {
    console.log(`Error updating User by ID: ${error.message}`);
  }
};

exports.sendReqParam = (req, res) => {
  let username = req.params.username;
  res.send(`This is the profile page for ${username}`);
};

exports.getLogIn = (req, res) => {
  res.render("logIn");
};