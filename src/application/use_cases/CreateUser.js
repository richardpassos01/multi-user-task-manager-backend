const User = require("../../domain/user/User");
class CreateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(name, email, password) {
    const user = new User(name, email);
    user.setPassword(password);

    return this.userRepository.create(user);
  }
}

module.exports = CreateUser;
