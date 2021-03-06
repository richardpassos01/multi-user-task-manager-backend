class RemoveTask {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId, projectId) {
    await this.taskRepository.remove(taskId, projectId);
  }
}

module.exports = RemoveTask;
