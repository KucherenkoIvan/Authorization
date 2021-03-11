const express = require('express');
const bcrypt = require('bcrypt');
const argon = require('argon2');
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

  const candidate = (await db.select().from('userdata').where('login', '=', login))[0];

  if (!candidate) {
    return res.status(500).json({
      msg: 'Пользователь не зарегистрирован в системе'
    })
  }

  const saltpwd = password + config.staticSalt + candidate.salt;

  const match = await argon.verify(candidate.password, saltpwd);

  if (match) {
    const token = await jwt.sign(
      {
        id: candidate.id,
        login
      },
      config.jwtsecret,
      {
        expiresIn: '1h',
      }
    );
    return res.status(200).json({ token });
  }
  else 
    return res.status(500).json({
      msg: 'Неверный пароль'
    });
});

router.post('/register', validators, async (req, res) => {
  const { login, password } = req.body;
  
  const customSalt = await bcrypt.genSalt(42);

  const saltPwd = password + config.staticSalt + customSalt;

  const pwdHash = await argon.hash(saltPwd);

  const newUser = await db.insert({ login, password: pwdHash, salt: customSalt }).into('userdata');
  res.status(200).json({ newUser });
});

module.exports = router;