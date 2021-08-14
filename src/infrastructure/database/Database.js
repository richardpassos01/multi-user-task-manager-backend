const knex = require("knex");

const Config = require("../../config");

class Database {
  constructor(knexInstance) {
    this.knexInstance = knexInstance;
  }

  static getInstance() {
    if (!Database.instance) {
      const knexConfig = {
        client: Config.database.client,
        connection: Config.database.connection,
        migrations: {
          directory: `${__dirname}/migrations`,
        },
        seeds: {
          directory: `${__dirname}/seeds`,
        },
      };
      Database.instance = new Database(knex(knexConfig));
      Database.instance.checkConnection();
    }

    return Database.instance;
  }

  async checkConnection() {
    return this.knexInstance.select(1).then(() => {
      console.log('database connected!');
    });
  }

  connection() {
    return this.knexInstance;
  }
}

module.exports = Database;
