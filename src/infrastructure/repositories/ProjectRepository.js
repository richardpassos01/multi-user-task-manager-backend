const {
  database: { tables },
} = require("../../config");
class ProjectRepository {
  constructor(database) {
    this.database = database;
  }

  async create(project) {
    return this.database.connection().insert(project).into(tables.projects);
  }

  async update(userId, projectId, name) {
    return this.database
      .connection()
      .update({ name })
      .where("user_id", userId)
      .andWhere("id", projectId)
      .into(tables.projects);
  }

  async remove(userId, projectId) {
    return this.database
      .connection()
      .del()
      .where("user_id", userId)
      .andWhere("id", projectId)
      .into(tables.projects);
  }

  async findByUserId(userId) {
    return this.database
      .connection()
      .select("name", "id", "created_at as createdAt")
      .where("user_id", userId)
      .into(tables.projects);
  }
}

module.exports = ProjectRepository;
