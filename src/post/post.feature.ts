import FeatureError from "~/utils/FeatureError"
import { INewPostBody } from "./types"
import { RESPONSE_CODE } from "~/types"
import { findUserBy } from "~/user/user.model"
import { addPost, getPostListBy, getPublicPostList } from "./post.model"
import { Post } from "~/db/entities/Post"

export const newPostFeature = async ({
  userId,
  title,
  content,
}: INewPostBody) => {
  try {
    const user = await findUserBy({ id: userId })
    if (!user) {
      throw new FeatureError(
        401,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User not found.",
      )
    }
    const newPost = await addPost({ user, title, content })

    return newPost
  } catch (error) {
    throw error
  }
}

export const getSelfPostsFeature = async (
  userId: number,
): Promise<[Post[], number]> => {
  try {
    const user = await findUserBy({ id: userId })
    if (!user) {
      throw new FeatureError(
        401,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User not found.",
      )
    }
    const records = await getPostListBy(user.id!)
    return records
  } catch (error) {
    throw error
  }
}

export const getPublicPostsFeature = async (): Promise<[Post[], number]> => {
  try {
    const records = await getPublicPostList()

    return records
  } catch (error) {
    throw error
  }
}
