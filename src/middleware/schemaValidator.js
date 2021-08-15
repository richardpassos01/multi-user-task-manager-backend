const { createValidator } = require("express-joi-validation");

const schemaValidator = createValidator({
  passError: true,
});

module.exports = schemaValidator;
