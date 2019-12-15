const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const config = require("./config");
const path = require("path");
const port = process.env.PORT || 9000;
var User = require("./server/models/user");
require("./server/models").connect(config.dbUri);
const app = express();
app.use(express.static("./server/static/"));
app.use(express.static("./client/dist/"));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secretpassword",
    resave: true,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log("serializeUser called");
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser(function(_id, done) {
  console.log("deserializeUser called");
  console.log(_id);
  User.findById(_id, function(err, user) {
    done(err, user);
  });
});

const localSignupStrategy = require("./server/passport/local-signup");
const localLoginStrategy = require("./server/passport/local-login");
const FacebookStrategy = require("./server/passport/passport-facebook");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);
passport.use("facebook", FacebookStrategy);

const authCheckMiddleware = require("./server/middleware/auth-check");
app.use("/api", authCheckMiddleware);

const authRoutes = require("./server/routes/auth");
const apiRoutes = require("./server/routes/api");
app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log("Server is running on http://localhost:9000 ");
});
