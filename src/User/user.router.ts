import express from "express"

import { validation } from "~/middleware/validation"
import { login, signUpController } from "./user.controller"
import { signUpSchema } from "./param-validation"
import { accountSchema } from "~/utils/common-param-validation"

const router = express.Router()

router.route("/signUp").post(validation(signUpSchema), signUpController)

router.route("/login").post(validation(accountSchema), login)
export default router
