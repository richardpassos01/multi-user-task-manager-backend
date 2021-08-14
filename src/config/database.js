const env = require('env-var');

const required = process.env.NODE_ENV !== "test";

const database = Object.freeze({
  client: 'mysql2',
  connection: {
    host: env.get("DATABASE_HOST").required(required).asString(),
    user: env.get("DATABASE_USER").required(required).asString(),
    password: env.get("DATABASE_PASSWORD").required(required).asString(),
    database: env.get("DATABASE_NAME").required(required).asString(),
  },
});

module.exports=database;
