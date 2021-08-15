const {
  database: { tables },
} = require("../../config");
class TaskRepository {
  constructor(database) {
    this.database = database;
  }

  async create(task) {
    return this.database.connection().insert(task).into(tables.tasks);
  }

  async findByProjectIds(projectIds) {
    return this.database
      .connection()
      .select(
        "id",
        "description",
        "project_id as projectId",
        "finished_at as finishedAt",
        "created_at as createdAt"
      )
      .whereIn("project_id", projectIds)
      .into(tables.tasks);
  }
}

module.exports = TaskRepository;
