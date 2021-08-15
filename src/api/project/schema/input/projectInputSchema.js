const Joi = require("joi");

const projectInputSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = {
  projectInputSchema,
};
