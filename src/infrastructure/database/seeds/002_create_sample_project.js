const { tables } = require("../../../config/database");

exports.seed = function (knex) {
  return knex(tables.projects)
    .del()
    .then(function () {
      return knex(tables.projects).insert([
        {
          id: "6c72f2a5-bace-4ec7-a5a7-2747e65f27a8",
          name: "sample project",
          user_id: "c1daef5f-4bd0-4616-bb62-794e9b5d8ca2",
        },
      ]);
    });
};
