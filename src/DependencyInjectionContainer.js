const Database = require('./infrastructure/database');

const UserController = require('./api/user/UserController');


const CreateUser = require('./application/use_cases/CreateUser');


const UserRepository = require('./infrastructure/repositories/UserRepository');


const database = Database.getInstance();

const userRepository = new UserRepository(database);

const createUser = new CreateUser(userRepository);

const userController = new UserController(createUser);

module.exports = {
  database,
  userController
};
