import express from "express"

import { validation } from "~/middleware/validation"

import { newPostSchema } from "./params-validation"
import auth from "~/middleware/auth"
import {
  getPostsController,
  getSelfPostsController,
  newPostController,
} from "./post.controller"

const router = express.Router()

router.route("/new").post(validation(newPostSchema), auth, newPostController)

router.route("/list/public").get(auth, getPostsController)

router.route("/list/self").get(auth, getSelfPostsController)

export default router
