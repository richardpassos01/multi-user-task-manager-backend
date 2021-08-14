const { v4: uuid } = require("uuid");
const crypto = require("crypto");
class User {
  constructor(name, email, id) {
    this.name = name;
    this.email = email;

    if (!id) {
      this.id = uuid();
    }
  }

  setPassword(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
      .toString("hex");
  }

  checkPassword(password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
      .toString("hex");

    return this.hash === hash;
  }
}

module.exports = User;
