
exports.up = function(knex) {
  return knex.schema
    .createTable('log', table => {
      table.increments();
      table.string('msg').notNullable();
      table.timestamp('stamp').defaultTo(knex.fn.now());
      table.string('type').notNullable();
    })
    .createTable('usergroup', table => {
      table.increments();
      table.string('name').notNullable();
    })
    .createTable('permission', table => {
      table.increments();
      table.string('name').notNullable();
      table.integer('groupid').notNullable().references('id').inTable('usergroup');
    })
    .createTable('userdata', table => {
      table.increments();
      table.string('login').notNullable();
      table.string('password').notNullable();
      table.string('salt').notNullable();
      table.integer('group').notNullable().references('id').inTable('usergroup');
    });
};

exports.down = function(knex) {
  
};
