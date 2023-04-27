const profileController = require("./controllers/profileController");
const signupController = require("./controllers/signupController");
const port = 3000,
 express = require("express"),
 app = express();
 app.set("views", (__dirname + "/views")),
 app.set("view engine", "ejs"),


 app.get("/profile/:username", profileController.sendReqParam);
 app.get("/sign_up", signupController.getSignUp);
app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});