const env = require("env-var");

const required = process.env.NODE_ENV !== "test";

const jwt = Object.freeze({
  accessTokenSecret: env.get("ACCESS_TOKEN_SECRET").required(required).asString(),
  timeToExpireAccessToken: `${env
    .get("ACCESS_TOKEN_EXPIRES_IN_HOURS")
    .default(24)
    .asIntPositive()}h`,
});

module.exports = jwt;
