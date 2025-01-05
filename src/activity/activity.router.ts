import express from "express"

import { validation } from "~/middleware/validation"

import auth from "~/middleware/auth"
import { newActivitySchema } from "./params-validation"
import {
  getActivityRecordsController,
  newActivityController,
} from "./activity.controller"

const router = express.Router()

router
  .route("/activity/new")
  .post(validation(newActivitySchema), auth, newActivityController)

router.route("/activity/records").get(auth, getActivityRecordsController)

export default router
