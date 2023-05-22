exports.getSignUp = (req, res) => {
    res.render("signUp");
   };

exports.saveUser = (req, res) => {
  let newUser = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  });

  newUser.save()
.then( () => {
res.render("thanks");
})
.catch(error => {
res.send(error);
});
};
