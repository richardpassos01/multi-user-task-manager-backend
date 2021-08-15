const { v4: uuid } = require("uuid");

class Project {
  constructor(name, userId, id = uuid()) {
    this.name = name;
    this.user_id = userId;
    this.id = id
  }
}

module.exports = Project;
