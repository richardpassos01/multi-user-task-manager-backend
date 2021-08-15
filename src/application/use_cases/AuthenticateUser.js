const jsonwebtoken = require("jsonwebtoken");
const { jwt } = require("../../config");
const User = require("../../domain/user/User");
class AuthenticateUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    const data = await this.userRepository.findByEmail(email);

    if (!data.length) {
      throw new Error("User not found");
    }

    const [{ name, id, salt, hash }] = data;

    const user = new User(name, email, id, salt, hash);
    const isValidPassword = user.checkPassword(password);

    if (!isValidPassword) {
      throw new Error("Invalid password or identifier");
    }

    const accessToken = jsonwebtoken.sign({ name, id, email }, jwt.accessTokenSecret, {
      expiresIn: jwt.timeToExpireAccessToken,
    });

    return {
      token_type: "bearer",
      access_token: accessToken,
      access_token_expires_in: jwt.timeToExpireAccessToken,
    };
  }
}

module.exports = AuthenticateUser;
