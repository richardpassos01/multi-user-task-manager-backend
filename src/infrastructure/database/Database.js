const knex = require("knex");

const Config = require("../../config");
const knexConfig = require("../../../knexfile.js");

class Database {
  constructor(knexInstance) {
    this.knexInstance = knexInstance;
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database(knex(knexConfig[Config.database.environment]));
      Database.instance.checkConnection();
    }

    return Database.instance;
  }

  async checkConnection() {
    return this.knexInstance.select(1).then(() => {
      console.log("database connected!");
    });
  }

  connection() {
    return this.knexInstance;
  }
}

module.exports = Database;
