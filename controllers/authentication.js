//const User = mongoose.model("user");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const secretConfig = require("../config/secret");

//Generating jwtoken => identifying piece of info created by including user id & iat
const tokenForUser = user => {
  const timestamp = new Date().getTime();
  //payload
  return jwt.encode({ sub: user.id, iat: timestamp }, secretConfig.secret); //sub i.e subject
};

//=>  /signup
//user lai token dinxa after user signup
//token header ma pass gareko xa vane matra protected route access garna painxa
//login gare paxi email/password milyo vane pani we issue token
exports.signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //Check if user provide empty email,password
  if (!email && !password) {
    res.json({ error: "Please provide credentials" });
  }

  //Identifying if email exist
  User.findOne({ email: email }, (err, userEmail) => {
    //cb are also use for handling promises.
    if (err) {
      return err;
    }
    //user with same email exist
    if (userEmail) {
      return res.status(422).json({ error: "Email already exist" });
    }
    const newUser = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        //if (err) throw err;
        newUser.password = hash;

        newUser
          .save()
          .then(user => {
            res.json({ token: tokenForUser(user) }); //we don't want send user info like pw etc so..
          })
          .catch(err => res.json(err));
      });
    });
  });
};

exports.login =
  ("/login",
  (req, res) => {
    //User already had their email/password authenticated else unauthorized
    //We just need to provide them token
    res.send({ token: tokenForUser(req.user) });
  });
