const levels = ['admin', 'user'];

module.exports = (req, res, next) => {
  const al = req.body && req.body.accessLevel;
  if (!al || !levels.includes(al)) {
    return res.status(500).json(new Error('validation error: invalid accessLevel'));
  }
  next();
}