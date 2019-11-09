//Importing files
const Authentication = require("./controllers/authentication");
const passport = require("passport");
const passportService = require("./services/passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireLogin = passport.authenticate("local", { session: false });

module.exports = app => {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  app.post("/signup", Authentication.signup);

  app.post("/login", requireLogin, Authentication.login);
};
