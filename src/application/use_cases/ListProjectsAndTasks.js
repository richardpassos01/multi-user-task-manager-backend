class ListProjectsAndTasks {
  constructor(projectRepository, taskRepository) {
    this.projectRepository = projectRepository;
    this.taskRepository = taskRepository;
  }

  async execute(userId) {
    const projects = await this.projectRepository.findByUserId(userId);

    if (!projects.length) {
      return [];
    }

    const projectsIds = projects.map(({ id }) => id);
    const tasks = await this.taskRepository.findByProjectIds(projectsIds);

    if (!tasks.length) {
      return projects;
    }

    const projectsAndTasks = projects.map((project) => {
      const projectTasks = tasks.filter(({ projectId }) => projectId === project.id);

      return {
        ...project,
        tasks: projectTasks,
      };
    });

    return projectsAndTasks;
  }
}

module.exports = ListProjectsAndTasks;
