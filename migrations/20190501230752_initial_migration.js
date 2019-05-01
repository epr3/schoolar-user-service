const uuid = require('uuid/v4');
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('students', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(uuid());
      table.string('name');
      table.string('surname');
      table.string('telephone');
      table.uuid('groupId');
      table.uuid('userId').unique();
    })
    .createTable('professors', table => {
      table
        .uuid('id')
        .primary()
        .defaultTo(uuid());
      table.string('name');
      table.string('surname');
      table.string('telephone');
      table.string('title');
      table.uuid('userId').unique();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('students')
    .dropTableIfExists('professors');
};
