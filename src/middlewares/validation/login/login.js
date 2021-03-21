function validate(login) {
  /*
    example login constraints:
    1) length between 4 and 32 ch.
    2) uses eng. letters, numbers and '-' '_' only
  */
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
  if (login.length < 4 || login.length > 32) {
    return false;
  }

  const arr = login.split('').filter(ch => alphabet.includes(ch) || !Number.isNaN(+ch)); // login to char array

  if (arr.length !== login.length) { // login contains forbiden symbols
    return false;
  }
  
  return true;
}

module.exports.middleware = (req, res, next) => {
  const login = req.body && req.body.login;
  if (login) {
    if (validate(login)) {
      return next();
    } else {
      return res.status(500).json(new Error('Validation error: invalid login'));
    }
  } else {
    return res.status(500).json(new Error('Validation error: no login provided'));
  }
}

module.exports.validate = validate;
