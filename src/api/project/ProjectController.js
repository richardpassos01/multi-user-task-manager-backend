const { v4: uuid } = require("uuid");
const { StatusCodes } = require("http-status-codes");
class ProjectController {
  constructor(listProjectsAndTasks, createProject, updateProject, removeProject) {
    this.listProjectsAndTasks = listProjectsAndTasks;
    this.createProject = createProject;
    this.updateProject = updateProject;
    this.removeProject = removeProject;
  }

  list(req, res, next) {
    const { id: userId } = req.user;

    return this.listProjectsAndTasks
      .execute(userId)
      .then((projects) => res.status(StatusCodes.OK).send(projects))
      .catch(next);
  }

  create(req, res, next) {
    const { name } = req.body;
    const { id: userId } = req.user;

    return this.createProject
      .execute(name, userId)
      .then((project) => res.status(StatusCodes.CREATED).send(project))
      .catch(next);
  }

  update(req, res, next) {
    const { name } = req.body;
    const { id: projectId } = req.params;
    const { id: userId } = req.user;

    return this.updateProject
      .execute(userId, projectId, name)
      .then(() => res.sendStatus(StatusCodes.NO_CONTENT))
      .catch(next);
  }

  remove(req, res, next) {
    const { id: projectId } = req.params;
    const { id: userId } = req.user;

    return this.removeProject
      .execute(userId, projectId)
      .then(() => res.sendStatus(StatusCodes.NO_CONTENT))
      .catch(next);
  }
}

module.exports = ProjectController;
