const Project = require("../../domain/project/Project");
class CreateProject {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute(name, userId) {
    const project = new Project(name, userId);

    await this.projectRepository.create(project);

    return project;
  }
}

module.exports = CreateProject;
