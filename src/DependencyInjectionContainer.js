const Database = require("./infrastructure/database");

const database = Database.getInstance();

module.exports = {
  database,
};
