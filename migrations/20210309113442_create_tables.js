
exports.up = function(knex) {
  return knex.schema
    .createTable('log', table => {
      table.increments();
      table.string('msg').notNullable();
      table.timestamp('stamp').defaultTo(knex.fn.now());
      table.string('type').notNullable();
    })
    .createTable('userdata', table => {
      table.increments();
      table.string('login').notNullable().unique();
      table.string('password').notNullable();
      table.string('salt').notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('log')
    .dropTable('usergroup')
};
