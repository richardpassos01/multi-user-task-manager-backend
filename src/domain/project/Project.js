const { v4: uuid } = require("uuid");

class Project {
  constructor(name, userId, id) {
    this.name = name;
    this.user_id = userId;
    this.id = id ? id : uuid();
  }
}

module.exports = Project;
