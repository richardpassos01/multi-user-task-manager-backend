const env = require('env-var');

const required = process.env.NODE_ENV !== 'test';

const application = Object.freeze({
  port: env.get('PORT').required(required).asIntPositive(),
});

module.exports=application;
