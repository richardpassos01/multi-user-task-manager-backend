const Database = require("./infrastructure/database");

const UserController = require("./api/user/UserController");
const ProjectController = require("./api/project/ProjectController");
const TaskController = require("./api/task/TaskController");

const CreateUser = require("./application/use_cases/CreateUser");
const AuthenticateUser = require("./application/use_cases/AuthenticateUser");
const ListProjectsAndTasks = require("./application/use_cases/ListProjectsAndTasks");
const CreateProject = require("./application/use_cases/CreateProject");
const UpdateProject = require("./application/use_cases/UpdateProject");
const RemoveProject = require("./application/use_cases/RemoveProject");
const CreateTask = require("./application/use_cases/CreateTask");
const UpdateTask = require("./application/use_cases/UpdateTask");
const RemoveTask = require("./application/use_cases/RemoveTask");
const CompleteTask = require("./application/use_cases/CompleteTask");

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
const createTask = new CreateTask(taskRepository);
const updateTask = new UpdateTask(taskRepository);
const removeTask = new RemoveTask(taskRepository);
const completeTask = new CompleteTask(taskRepository);

const userController = new UserController(createUser, authenticateUser);
const projectController = new ProjectController(
  listProjectsAndTasks,
  createProject,
  updateProject,
  removeProject
);
const taskController = new TaskController(createTask, updateTask, removeTask, completeTask);

module.exports = {
  database,
  userController,
  projectController,
  taskController,
  userRepository,
  projectRepository,
  taskRepository,
  authenticateUser,
};
