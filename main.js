const userController = require("./controllers/userController");
const jobController = require("./controllers/jobController");


const mongoose = require("mongoose");
mongoose.connect(
 "mongodb://127.0.0.1:27017/WTAT",
 {useNewUrlParser: true}
);

const db = mongoose.connection;
db.once("open", () => {
console.log("Successfully connected to MongoDB using Mongoose!");
});


const port = 3000,
express = require("express"),

app = express();
app.use(express.urlencoded({ extended: true })),
app.set("views", (__dirname + "/views")),
app.set("view engine", "ejs"),

app.get("/profile/:username", userController.sendReqParam);
app.get("/signup", userController.getSignUp);
app.get("/user", userController.getAllUser);
app.get("/login", userController.getLogIn);
app.get("/jobs/:id", jobController.getJobInfo);
app.get("/job/add", jobController.addJob);
app.get("/job/search", jobController.searchForaJob);

app.get("/admin/jobs", jobController.getAllJobs);

app.post("/job/add", jobController.saveJob);
app.post("/signup", userController.saveUser);
app.post("/job/search", jobController.searchJobs);

app.listen(port, () => {
 console.log(`Server running on port: ${port}`);
});
