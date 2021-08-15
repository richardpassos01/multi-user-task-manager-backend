const Database = require("./infrastructure/database");

const UserController = require("./api/user/UserController");
const ProjectController = require("./api/project/ProjectController");

const CreateUser = require("./application/use_cases/CreateUser");
const AuthenticateUser = require("./application/use_cases/AuthenticateUser");
const ListProjectsAndTasks = require("./application/use_cases/ListProjectsAndTasks");
const CreateProject = require("./application/use_cases/CreateProject");
const UpdateProject = require("./application/use_cases/UpdateProject");
const RemoveProject = require("./application/use_cases/RemoveProject");

const UserRepository = require("./infrastructure/repositories/UserRepository");
const ProjectRepository = require("./infrastructure/repositories/ProjectRepository");
const TaskRepository = require("./infrastructure/repositories/TaskRepository");

const database = Database.getInstance();

const userRepository = new UserRepository(database);
const projectRepository = new ProjectRepository(database);
const taskRepository = new TaskRepository(database);

const createUser = new CreateUser(userRepository);
const authenticateUser = new AuthenticateUser(userRepository);
const listProjectsAndTasks = new ListProjectsAndTasks(projectRepository, taskRepository);
const createProject = new CreateProject(projectRepository);
const updateProject = new UpdateProject(projectRepository);
const removeProject = new RemoveProject(projectRepository);

const userController = new UserController(createUser, authenticateUser);
const projectController = new ProjectController(
  listProjectsAndTasks,
  createProject,
  updateProject,
  removeProject
);

module.exports = {
  database,
  userController,
  projectController,
  userRepository,
  projectRepository,
  taskRepository,
  authenticateUser
};
