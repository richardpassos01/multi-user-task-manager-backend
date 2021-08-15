const { v4: uuid } = require("uuid");
const Task = require("../../src/domain/task/Task");
const { taskRepository } = require("../../src/DependencyInjectionContainer");

class TaskFactory {
  constructor(description = "default description", projectId = uuid()) {
    this.task = new Task(description, projectId);
  }

  get() {
    return this.task;
  }

  async save() {
    return taskRepository.create(this.task);
  }

  async getAndSave() {
    await this.save();
    return this.get();
  }
}

module.exports = TaskFactory;
