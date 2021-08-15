class CompleteTask {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId, projectId) {
    await this.taskRepository.complete(taskId, projectId);
  }
}

module.exports = CompleteTask;
