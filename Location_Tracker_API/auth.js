require("dotenv").config();

module.exports = function authenticate(req, res, next) {
  const secretKey = req.headers["secret-key"];
  if (secretKey === process.env.SECRET_KEY) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
};
