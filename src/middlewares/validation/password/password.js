function validate(password) {
  /*
    example password constraints:
    1) length between 4 and 32 ch.
    2) includes both lower and upper case
    3) includes letters and numbers
    4) uses eng. letters only
  */
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const extras = "!@#$%^&*()_+=-:;.,/'\\\" ?><`~№";
  if (password.length < 4 || password.length > 32) {
    return false;
  }

  const arr = password.split('').filter(ch => [...alphabet, ...ALPHABET, ...extras].includes(ch) || !Number.isNaN(+ch)); // password to char array

  if (arr.length !== password.length) { // password contains forbiden symbols
    return false;
  }
  
  return Boolean(arr.find(ch => alphabet.includes(ch)) && arr.find(ch => ALPHABET.includes(ch)) && arr.find(ch => !isNaN(+ch)));
}

module.exports = (req, res, next) => {
  const pwd = req.body && req.body.password;
  if (pwd) {
    if (validate(pwd)) {
      return next();
    } else {
      return res.status(500).json(new Error('Validation error: invalid password'));
    }
  } else {
    return res.status(500).json(new Error('Validation error: no password provided'));
  }
}
