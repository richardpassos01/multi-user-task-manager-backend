class RemoveProject {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(userId, projectId) {
    await this.projectRepository.remove(userId, projectId);
  }
}

module.exports = RemoveProject;
