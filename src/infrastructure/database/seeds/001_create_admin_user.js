const { tables } = require("../../../config/database");

exports.seed = function (knex) {
  return knex(tables.users)
    .del()
    .then(function () {
      return knex(tables.users).insert([
        {
          id: "c1daef5f-4bd0-4616-bb62-794e9b5d8ca2",
          name: "admin",
          email: "admin@admin",
          salt: "307bd80ffe7a1ed46c587bfdbf59512e",
          hash: "37c29bbaca2c321beb183dbc068a1fc0053deeed2a7ed4900224096b7858162f660ded08d38009917d9640cfd420d5aea8b7",
        },
      ]);
    });
};
