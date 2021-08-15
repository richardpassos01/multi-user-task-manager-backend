const Task = require("../../domain/task/Task");

class CreateTask {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(description, projectId) {
    const task = new Task(description, projectId);

    await this.taskRepository.create(task);

    return task;
  }
}

module.exports = CreateTask;
