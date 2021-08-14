const { StatusCodes, ReasonPhrases } = require('http-status-codes');
class UserController {
  constructor(createUser) {
    this.createUser = createUser;
  }

  create(req, res, next) {
    const { name, email, password } = req.body;

    return this.createUser.execute(name, email, password)
      .then(() => res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED))
      .catch(next);
  }
}

module.exports = UserController;
