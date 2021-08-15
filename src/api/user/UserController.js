const { StatusCodes, ReasonPhrases } = require("http-status-codes");
class UserController {
  constructor(createUser, authenticateUser) {
    this.createUser = createUser;
    this.authenticateUser = authenticateUser;
  }

  create(req, res, next) {
    const { name, email, password } = req.body;

    return this.createUser
      .execute(name, email, password)
      .then(() => res.status(StatusCodes.CREATED).send(ReasonPhrases.CREATED))
      .catch(next);
  }

  authenticate(req, res, next) {
    const { email, password } = req.body;

    return this.authenticateUser
      .execute(email, password)
      .then((token) => res.status(StatusCodes.OK).send(token))
      .catch(next);
  }
}

module.exports = UserController;
