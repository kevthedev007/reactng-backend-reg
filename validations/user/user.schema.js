const Joi = require('joi');

const schema = {
  user: Joi.object({
    firstname: Joi.string()
      .min(1)
      .max(50)
      .required(),

    lastname: Joi.string()
      .min(1)
      .max(50)
      .required(),

    email: Joi.string()
      .email()
      .required(),

    phone: Joi.string().pattern(/^[0-9]+$/).required(),

    course: Joi.string(),

    accountNumber: Joi.number().required()
  })
}

module.exports = schema;