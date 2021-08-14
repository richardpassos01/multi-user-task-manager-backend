const Config = require('../../config');
class userRepository {
  constructor(database) {
    this.database = database;
  }

  async create(user) {
    return this.database.connection()
      .insert(user)
      .into(Config.database.tables.users);
  }
}

module.exports = userRepository;
