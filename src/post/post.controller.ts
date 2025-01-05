import { IApi } from "~/types"
import errorHandler from "~/utils/errorHandler"
import { INewPostBody, INewPostResponse, IGetPostsResponse } from "./types"
import {
  getPublicPostsFeature,
  getSelfPostsFeature,
  newPostFeature,
} from "./post.feature"
import { IAuth } from "~/user/types"

export const newPostController: IApi<
  any,
  INewPostResponse,
  INewPostBody,
  any
> = async (req, res) => {
  try {
    const newPost = await newPostFeature({ ...req.body })
    return res.status(200).send({
      status: "ok",
      message: `Post successful!`,
      newPost,
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

export const getPostsController: IApi<
  any,
  IGetPostsResponse,
  IAuth,
  any
> = async (req, res) => {
  try {
    const [postList, total] = await getPublicPostsFeature()
    return res.status(200).send({
      status: "ok",
      message: `Post successful!`,
      postList,
      total,
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

export const getSelfPostsController: IApi<
  any,
  IGetPostsResponse,
  IAuth,
  any
> = async (req, res) => {
  try {
    const { userId } = req.body
    const [postList, total] = await getSelfPostsFeature(userId)
    return res.status(200).send({
      status: "ok",
      message: `Post successful!`,
      postList,
      total,
    })
  } catch (error) {
    errorHandler(res, error)
  }
}
