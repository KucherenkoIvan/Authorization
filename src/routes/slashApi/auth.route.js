const express = require('express');
const bcrypt = require('bcrypt');
const argon = require('argon2');
const db = require('../../db');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

const middlewares = [
  require('../../middlewares/validation/password/password').middleware,
  require('../../middlewares/validation/login/login').middleware,
]

const validators = {
  password: require('../../middlewares/validation/password/password').validate,
  login: require('../../middlewares/validation/login/login').validate,
}

const router = express.Router();

router.get('/users', async (req, res) => {
  const userlist = await db.select().from('userdata');
  return res.status(200).json(userlist);
})

const hashPassword = async (password, salt) => {

  if (!salt) {
    salt = await bcrypt.genSalt(42);
  }

  const saltPwd = password + config.staticSalt + salt;

  const pwdHash = await argon.hash(saltPwd);

  return [pwdHash, salt];
}

router.patch('/edit', async (req, res) => {
  console.log(req.body)
  const { id, login, password, accessLevel } = req.body;

  if (!!login && !validators.login(login)) {
    return res.status(500).json({
      msg: 'Неверный логин',
    })
  }
  if (!!password && !validators.password(password)) {
    return res.status(500).json({
      msg: 'Неверный пароль',
    })
  }

  const candidate = (await db.select().from('userdata').where('id', '=', id))[0];

  const [pwdHash] = !!password ? await hashPassword(password, candidate.salt) : [candidate.password];

  const responseData = (
    await db('userdata')
    .where({ id })
    .update({ login: login || candidate.login, password: pwdHash, accessLevel: accessLevel || candidate.accessLevel })
  );
  
  res.status(200).json({
    msg: responseData
  });
})

router.delete('/delete', async (req, res) => {
  const { id } = req.body;
  
  const candidate = (
    await db('userdata')
    .where('id', '=', id)
    .del()
  );

  res.status(200).json({
    msg: candidate
  });
})

router.post('/authorize', middlewares, async (req, res) => {
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
        login,
        accessLevel: candidate.accessLevel,
        salt: candidate.salt
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

router.post('/register', middlewares, async (req, res) => {
  const { login, password, accessLevel } = req.body;
  
  const [pwdHash, salt] = await hashPassword(password);

  const newUser = await db.insert({ login, password: pwdHash, salt, accessLevel }).into('userdata');
  res.status(200).json({ newUser });
});

module.exports = router;