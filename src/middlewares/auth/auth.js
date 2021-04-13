const jwt = require("jsonwebtoken");
const config = require("../../config/config.json");

module.exports = async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  let { accessLevel } = jwt.verify(token, config.jwtsecret);
  if (accessLevel === "user") {
    throw new Error("Недостаточно прав");
  } else {
    next();
  }
};
