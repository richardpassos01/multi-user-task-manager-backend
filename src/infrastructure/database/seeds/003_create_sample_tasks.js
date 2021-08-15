const { tables } = require("../../../config/database");

exports.seed = function (knex) {
  return knex(tables.tasks)
    .del()
    .then(function () {
      return knex(tables.tasks).insert([
        {
          id: "61ffacb0-d936-4bf0-a53d-264333487511",
          description: "sample task",
          project_id: "6c72f2a5-bace-4ec7-a5a7-2747e65f27a8",
        },
      ]);
    });
};
