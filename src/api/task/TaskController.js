const { StatusCodes } = require("http-status-codes");
class TaskController {
  constructor(createTask, updateTask, removeTask, completeTask) {
    this.createTask = createTask;
    this.updateTask = updateTask;
    this.removeTask = removeTask;
    this.completeTask = completeTask;
  }

  create(req, res, next) {
    const { projectId } = req.params;
    const { description } = req.body;

    return this.createTask
      .execute(description, projectId)
      .then((project) => res.status(StatusCodes.CREATED).send(project))
      .catch(next);
  }

  update(req, res, next) {
    const { id: taskId, projectId } = req.params;
    const { description } = req.body;

    return this.updateTask
      .execute(taskId, projectId, description)
      .then(() => res.sendStatus(StatusCodes.NO_CONTENT))
      .catch(next);
  }

  remove(req, res, next) {
    const { id: taskId, projectId } = req.params;

    return this.removeTask
      .execute(taskId, projectId)
      .then(() => res.sendStatus(StatusCodes.NO_CONTENT))
      .catch(next);
  }

  complete(req, res, next) {
    const { id: taskId, projectId } = req.params;

    return this.completeTask
      .execute(taskId, projectId)
      .then(() => res.sendStatus(StatusCodes.NO_CONTENT))
      .catch(next);
  }
}

module.exports = TaskController;
