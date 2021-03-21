module.exports = async function authMiddleware(req, res, next) {
  const { accessLevel } = req.body;

  if (accessLevel === 'user') {
    throw new Error("Недостаточно прав");
  }
  else {
    next();
  }
}