const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../../db');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

const validators = [
  require('../../middlewares/validation/password/password'),
  require('../../middlewares/validation/login/login'),
]

const router = express.Router();

router.post('/authorize', validators, async (req, res) => {
  const { login, password } = req.body;

  const candidate = await db.select().from('userdata').where('login', '=', login)[0];

  if (!candidate) {
    return res.status(500).json({
      msg: 'Пользователь не зарегистрирован в системе'
    })
  }

  const match = await bcrypt.compare(password, candidate.password);

  if (match) {
    const token = await jwt.sign({id: candidate.id, login, group: candidate.group }, 'kinda key', { algorithm: 'RS256' });
    return res.status(200).json({ token });
  }
  else 
    return res.status(500).json({
      msg: 'Неверный пароль'
    });
});

router.post('/register', validators, async (req, res) => {
  const { login, password, group } = req.body;

  const groupObj = await db.select().from('usergroup').where('id', '=', group);

  if (!groupObj) {
    return res.status(500).json({
      msg: 'Invalid group'
    });
  }
  
  const customSalt = await bcrypt.genSalt(42);

  const pwdHash = await bcrypt.hash(password, customSalt + config.staticSalt);

  const someshit = await db.insert({ login, password: pwdHash, group: groupObj.id, salt: customSalt }).into('userdata');
  res.status(200).json({ someshit });
});

module.exports = router;