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

  const getPwdData = async pwd => {
    const salt = await bcrypt.genSalt();
    const saltPwd = pwd + config.staticSalt + salt;
    const password = await argon.hash(saltPwd);
    return { salt, password };
  }

  const users = [
    {id: 1, login: 'admin', password: adminPassword, salt: adminSalt, accessLevel: 'admin' },
    {id: 2, login: 'user', password: userPassword, salt: userSalt, accessLevel: 'user' },
  ];

  for (let i = 0; i < 100 + Math.floor(Math.random() * 100); i++) {
    const adminChanse = 5; // %
    const randomFactor = Math.floor(Math.random() * 100);
    const type = randomFactor >= 100 - adminChanse ? 'admin' : 'user';
    
    const login = type + i + Math.floor(Math.random() * 1e4);
    const pwdData = await getPwdData('F' + login);
    users.push({id: i + 3, login, ...pwdData, accessLevel: type });
  }

  // Deletes ALL existing entries
  return knex('userdata').del()
    .then(function () {
      // Inserts seed entries
      return knex('userdata').insert(users);
    });
};
