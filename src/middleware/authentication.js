const jsonwebtoken = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { jwt } = require("../config");

function authentication(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  const [_, token] = authHeader.split(" ");

  return jsonwebtoken.verify(token, jwt.accessTokenSecret, (err, user) => {
    if (err) {
      return response.sendStatus(StatusCodes.FORBIDDEN);
    }

    request.user = user;
    return next();
  });
}

module.exports = authentication;
