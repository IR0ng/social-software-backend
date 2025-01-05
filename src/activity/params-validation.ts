import Joi from "joi"

export const newActivitySchema = Joi.object({
  body: Joi.object().keys({
    activityType: Joi.number().required(),
    osType: Joi.number().required(),
    location: Joi.string().required().max(100),
  }),
})
