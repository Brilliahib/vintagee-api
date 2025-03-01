const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().min(8).required(),
  passwordConfirmation: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Password confirmation does not match password",
    }),
  phone: Joi.number().min(8).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateRegister = (data) => {
  const { error, value } = registerSchema.validate(data, { abortEarly: false });
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return { error: errorMessage };
  }
  const { passwordConfirmation, ...userData } = value;
  return { value: userData };
};

const validateLogin = (data) => {
  const { error, value } = loginSchema.validate(data);
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
