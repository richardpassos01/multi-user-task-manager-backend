const { v4: uuid } = require("uuid");

class Task {
  constructor(description, projectId, id) {
    this.description = description;
    this.projectId = projectId;
    this.id = id ? id : uuid();
  }
}

module.exports = Task;
