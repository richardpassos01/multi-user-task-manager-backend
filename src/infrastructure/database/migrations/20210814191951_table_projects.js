const { tables } = require("../../../config/database");

exports.up = function (knex) {
  return knex.schema.createTableIfNotExists(tables.projects, (table) => {
    table.uuid("id").primary();
    table.string("name", 350).notNullable();
    table.uuid("user_id").references(`${tables.users}.id`).onDelete("CASCADE").notNullable();

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.projects);
};
