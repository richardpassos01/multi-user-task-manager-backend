const { tables } = require("../../../config/database");

exports.up = function (knex) {
  return knex.schema.createTableIfNotExists(tables.tasks, (table) => {
    table.uuid("id").primary();
    table.string("description", 350).notNullable();
    table.uuid("project_id").references(`${tables.projects}.id`).onDelete("CASCADE").notNullable();
    table.timestamp("finished_at");

    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.tasks);
};
