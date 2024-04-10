import { Joi } from "celebrate";

const registerSchema = {
  body: {
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    role: Joi.string().trim().required(),
    password: Joi.string()
      .trim()
      .regex(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
      .required(),
  },
};

const signInSchema = {
  body: {
    email: Joi.string().trim().email().required(),
    password: Joi.string()
      .trim()
      .regex(/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
      .required(),
  },
};

export default { registerSchema, signInSchema };
