//env var from Heroku goes here
module.exports = {
  mongoURI: process.env.MONGO_URI,
  secret: process.env.SECRET
};
