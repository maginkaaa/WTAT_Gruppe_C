exports.sendReqParam = (req, res) => {
    let username = req.params.username;
    res.send(`This is the profile page for ${username}`);
   };