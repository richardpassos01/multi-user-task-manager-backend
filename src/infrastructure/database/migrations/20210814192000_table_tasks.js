const { tables } = require("../../../config/database");

exports.up = function (knex) {
  return knex.schema.hasTable(tables.tasks).then(function (exists) {
    if (!exists) {
      return knex.schema
        .createTable(tables.tasks, function (table) {
          table.uuid("id").primary();
          table.string("description", 350).notNullable();
          table
            .uuid("project_id")
            .references(`${tables.projects}.id`)
            .onDelete("CASCADE")
            .notNullable();
          table.timestamp("finished_at");

          table.timestamps(true, true);
        })
        .then();
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tables.tasks);
};
