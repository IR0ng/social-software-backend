import Joi from "joi"

export const signUpSchema = Joi.object({
  body: Joi.object().keys({
    userName: Joi.string().required().min(3).max(30),
    password: Joi.string().min(8).max(30).required(),
    email: Joi.string().email().trim().required().max(320),
    avatar: Joi.string().required(),
    gender: Joi.number().valid(0, 1, 2).required(),
    introduction: Joi.string().required().max(500),
  }),
})
