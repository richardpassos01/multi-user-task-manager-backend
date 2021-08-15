const { v4: uuid } = require("uuid");
const Project = require("../../src/domain/project/Project");
const { projectRepository } = require("../../src/DependencyInjectionContainer");

class ProjectFactory {
  constructor(name = "default project", userId = uuid()) {
    this.project = new Project(name, userId);
  }

  get() {
    return this.project;
  }

  async save() {
    return projectRepository.create(this.project);
  }

  async getAndSave() {
    await this.save();
    return this.get();
  }
}

module.exports = ProjectFactory;
