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

const router = express.Router();
userRoutes = require("./routes/userRoutes"),
jobRoutes = require("./routes/jobRoutes");
app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);

module.exports = router;

const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);

const jobNotificationController = require("./controllers/jobNotificationController");
jobNotificationController.configure(io);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});