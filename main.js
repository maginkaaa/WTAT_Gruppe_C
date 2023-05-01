const profileController = require("./controllers/profileController");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");

const port = 3000,
 express = require("express"),
 app = express();
 app.set("views", (__dirname + "/views")),
 app.set("view engine", "ejs"),

 app.get("/profile/:username", profileController.sendReqParam);
 app.get("/signup", signupController.getSignUp);
app.get("/login", loginController.getLogIn);
app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});