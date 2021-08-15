const { tables } = require("../../../config/database");

exports.up = function (knex) {
  return knex.schema.hasTable(tables.users).then(function (exists) {
    if (!exists) {
      return knex.schema
        .createTable(tables.users, function (table) {
          table.uuid("id").primary();
          table.string("name", 350).notNullable();
          table.string("email", 50).unique().notNullable();
          table.string("salt", 50).notNullable();
          table.string("hash", 250).notNullable();

          table.timestamps(true, true);
        })
        .then();
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.users);
};
