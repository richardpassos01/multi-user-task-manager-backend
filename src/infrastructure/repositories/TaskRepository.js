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

  async update(taskId, projectId, description) {
    return this.database
      .connection()
      .update({ description })
      .where("id", taskId)
      .andWhere("project_id", projectId)
      .whereNull("completed_at")
      .into(tables.tasks);
  }

  async remove(taskId, projectId) {
    return this.database
      .connection()
      .del()
      .where("id", taskId)
      .andWhere("project_id", projectId)
      .whereNull("completed_at")
      .into(tables.tasks);
  }

  async complete(taskId, projectId) {
    return this.database
      .connection()
      .update({ completed_at: new Date() })
      .where("id", taskId)
      .andWhere("project_id", projectId)
      .into(tables.tasks);
  }

  async findByProjectIds(projectIds) {
    return this.database
      .connection()
      .select(
        "id",
        "description",
        "project_id as projectId",
        "completed_at as finishedAt",
        "created_at as createdAt"
      )
      .whereIn("project_id", projectIds)
      .into(tables.tasks);
  }
}

module.exports = TaskRepository;
