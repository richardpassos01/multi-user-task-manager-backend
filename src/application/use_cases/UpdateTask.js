class UpdateTask {
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskId, projectId, description) {
    return this.taskRepository.update(taskId, projectId, description);
  }
}

module.exports = UpdateTask;
