class UpdateProject {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
      }
    
      async execute(userId, projectId, name) {
        return this.projectRepository.update(userId, projectId, name);
      }
}

module.exports=UpdateProject;
