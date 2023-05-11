const profileController = require("./controllers/profileController");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const jobDetailController = require("./controllers/jobDetailController");
const User = require("./models/user.module");


const port = 3000,
    express = require("express"),
    app = express();
app.set("views", (__dirname + "/views")),
    app.set("view engine", "ejs"),

    app.get("/profile/:username", profileController.sendReqParam);
app.get("/signup", signupController.getSignUp);
app.get("/login", loginController.getLogIn);
app.get("/jobs/:id", jobDetailController.getJobInfo);
app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});