import { Post } from "~/db/entities/Post"
import { INewPostModel } from "./types"

export const addPost = ({ user, title, content }: INewPostModel) => {
  const newPost = new Post()
  newPost.user = user
  newPost.title = title
  newPost.content = content
  return newPost.save()
}

export const getPostListBy = (userId: number) => {
  return Post.findAndCount({
    where: { userId },
    order: { createdAt: "DESC" },
  })
}

export const getPublicPostList = () => {
  return Post.findAndCount({
    relations: { user: true },
    order: { createdAt: "DESC" },
  })
}
