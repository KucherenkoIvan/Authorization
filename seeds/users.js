const bcrypt = require('bcrypt');
const config = require('../src/config/config.json');
const argon = require('argon2');

exports.seed = async function(knex) {
  const salt = await bcrypt.genSalt();
  const saltPwd = 'A1s2d34F' + config.staticSalt + salt;
  const password = await argon.hash(saltPwd);
  // Deletes ALL existing entries
  return knex('userdata').del()
    .then(function () {
      // Inserts seed entries
      return knex('userdata').insert([
        {id: 1, login: 'test', password, salt, accessLevel: 'admin' },
      ]);
    });
};
