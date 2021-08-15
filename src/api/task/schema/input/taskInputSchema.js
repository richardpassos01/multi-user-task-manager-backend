const Joi = require("joi");

const taskInputSchema = Joi.object({
  description: Joi.string().required(),
});

module.exports = {
  taskInputSchema,
};
