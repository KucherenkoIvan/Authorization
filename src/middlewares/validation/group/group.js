module.exports = (req, res, next) => {
  if (req.body?.group) {
    next();
  } else {
    res.status(500).json(new Error('Validation error: invalid group name'));
  }
}