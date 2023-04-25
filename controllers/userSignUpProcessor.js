exports.sendReqParam = (req, res) => {
    let username = req.params.username;
    res.send(`This is the login page for username: ${username}`);
   };