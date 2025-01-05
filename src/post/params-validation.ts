import Joi from "joi"

export const newPostSchema = Joi.object({
  body: Joi.object().keys({
    title: Joi.string().required().min(1).max(20),
    content: Joi.string().required().min(1).max(500),
  }),
})
