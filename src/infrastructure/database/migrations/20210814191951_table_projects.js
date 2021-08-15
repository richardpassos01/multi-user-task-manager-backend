const { tables } = require("../../../config/database");

exports.up = function (knex) {
  return knex.schema.hasTable(tables.projects).then(function (exists) {
    if (!exists) {
      return knex.schema
        .createTable(tables.projects, function (table) {
          table.uuid("id").primary();
          table.string("name", 350).notNullable();
          table.uuid("user_id").references(`${tables.users}.id`).onDelete("CASCADE").notNullable();

          table.timestamps(true, true);
        })
        .then();
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.projects);
};
