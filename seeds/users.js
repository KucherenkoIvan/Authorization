const bcrypt = require('bcrypt');
const config = require('../src/config/config.json');
const argon = require('argon2');

exports.seed = async function(knex) {
  const adminSalt = await bcrypt.genSalt();
  const adminSaltPwd = 'Admin123' + config.staticSalt + adminSalt;
  const adminPassword = await argon.hash(adminSaltPwd);

  const userSalt = await bcrypt.genSalt();
  const userSaltPwd = 'User123' + config.staticSalt + userSalt;
  const userPassword = await argon.hash(userSaltPwd);

  const users = [];

  for (let i = 0; i < 100; i++) {
    users.push({id: i + 3, login: 'user' + Math.floor(Math.random() * 10000), password: userPassword, salt: userSalt, accessLevel: 'user' });
  }

  // Deletes ALL existing entries
  return knex('userdata').del()
    .then(function () {
      // Inserts seed entries
      return knex('userdata').insert([
        {id: 1, login: 'admin', password: adminPassword, salt: adminSalt, accessLevel: 'admin' },
        {id: 2, login: 'user', password: userPassword, salt: userSalt, accessLevel: 'user' },
        ...users
      ]);
    });
};
