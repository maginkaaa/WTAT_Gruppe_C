const profileController = require("./controllers/profileController");
const signupController = require("./controllers/signupController");
const loginController = require("./controllers/loginController");
const jobAddController = require("./controllers/jobAddController");
const jobDetailController = require("./controllers/jobDetailController");
const searchJobsController = require("./controllers/searchJobsController");

const User = require("./models/user.module");
const jobOpening = require("./models/jobOpening.module");

const mongoose = require("mongoose");
mongoose.connect(
 "mongodb://127.0.0.1:27017/WTAT",
 {useNewUrlParser: true}
);

const db = mongoose.connection;

const port = 3000,
express = require("express"),
app = express();
app.use(express.urlencoded({ extended: true })),
app.set("views", (__dirname + "/views")),
app.set("view engine", "ejs"),

app.get("/profile/:username", profileController.sendReqParam);
app.get("/signup", signupController.getSignUp);
app.get("/login", loginController.getLogIn);

app.get("/jobs/:id", jobDetailController.getJobInfo);
app.get("/job/add", jobAddController.addJob);
app.post("/job/add", jobAddController.saveJob);
app.get("/job/search", searchJobsController.searchForaJob);
app.post("/job/search", searchJobsController.searchJobs);

app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});