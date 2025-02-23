const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
  phone: Joi.number().min(8).optional(),
  role: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateRegister = (data) => {
  const { error } = registerSchema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return { error: errorMessage };
  }
  return { value: data };
};

const validateLogin = (data) => {
  const { error } = loginSchema.validate(data);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return { error: errorMessage };
  }
  return { value: data };
};

module.exports = {
  validateRegister,
  validateLogin,
};
