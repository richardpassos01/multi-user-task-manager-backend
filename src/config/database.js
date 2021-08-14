const env = require('env-var');

const database = Object.freeze({
  client: 'mysql2',
  connection: {
    host: env.get('DATABASE_HOST').required(true).asString(),
    user: env.get('DATABASE_USER').required(true).asString(),
    password: env.get('DATABASE_PASSWORD').required(true).asString(),
    database: env.get('DATABASE_NAME').required(true).asString(),
  },
  environment:  env.get('NODE_ENV').default('development').asString(),
  tables: {
    users: 'users'
  }
});

module.exports=database;
