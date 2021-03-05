const express = require('express');
const argon = require('argon2');
const pg = require('pg');

const validators = [
  require('../../middlewares/validation/password/password'),
  require('../../middlewares/validation/login/login'),
]

const router = express.Router();

router.post('/autorize', ...validators, async (req, res) => {
  const { login, password } = req.body;

  const candidate = pg.Query(`SELECT * from 'Users' where Users.login = "${login}" limit 1`);

  const match = await (argon.verify(candidate.password, password));

  if (match) {
    res.status(200).json({ id: candidate.id, login });
  }
});

router.post('/register', ...validators, async (req, res) => {

});

module.exports = router;