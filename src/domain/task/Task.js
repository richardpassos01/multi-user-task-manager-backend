const { v4: uuid } = require("uuid");

class Task {
  constructor(description, projectId, id = uuid()) {
    this.description = description;
    this.project_id = projectId;
    this.id = id;
  }
}

module.exports = Task;
