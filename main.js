const userController = require("./controllers/userController");
const jobController = require("./controllers/jobController");
const User = require("./models/user.module");

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/WTAT", { useNewUrlParser: true });

const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

const methodOverride = require("method-override");

const port = 3000;
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

const expressSession = require("express-session");
const router = express.Router();
app.use(expressSession({
    secret: "secret_passcode",
    cookie: {
        maxAge: 4000000
    },
    resave: false,
    saveUninitialized: false
}));

const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());

app.use(cookieParser("secret_passcode"));

app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  next();
 });

app.delete("/jobs/:id/delete", jobController.deleteJob);
app.delete("/user/:id/delete", userController.deleteUser);

app.get("/users/:username", userController.sendReqParam);
app.get("/signup", userController.getSignUp);
app.get("/user", userController.getAllUser);
app.get("/login", userController.getLogIn);
app.get("/signup", userController.addUser);
app.get("/jobs/:id", jobController.getJobInfo);
app.get("/job/add", jobController.addJob);
app.get("/job/search", jobController.searchForaJob);
app.get("/admin/jobs", jobController.getAllJobs);
app.get("/jobs/:id/edit", jobController.editJob);

app.put("/jobs/:id/update", jobController.updateJob);
app.put("/user/:id/update", userController.updateUser);

app.post("/job/add", jobController.saveJob);
app.post("/signup", userController.saveUser);
app.post("/login", userController.authenticate);
app.post("/job/search", jobController.searchJobs);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
