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

  async findByEmail(email) {
    return this.database.connection()
      .select('name', 'salt', 'hash', 'id')
      .where('email', email)
      .into(Config.database.tables.users);
  }
}

module.exports = userRepository;
