import express from "express"

import { validation } from "~/middleware/validation"
import {
  getUserByAuthController,
  getUserController,
  loginController,
  signUpController,
} from "./user.controller"
import { getUserInfoSchema, signUpSchema } from "./param-validation"
import { accountSchema } from "~/utils/common-param-validation"
import auth from "~/middleware/auth"

const router = express.Router()

router.route("/sign-up").post(validation(signUpSchema), signUpController)

router.route("/login").post(validation(accountSchema), loginController)

router.route("/info/self").get(auth, getUserByAuthController)

router
  .route("/info/:userId")
  .get(validation(getUserInfoSchema), auth, getUserController)

router.route("/list")
export default router
