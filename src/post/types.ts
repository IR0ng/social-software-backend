import { Post } from "~/db/entities/Post"
import { UserData } from "~/db/entities/UserData"

export interface INewPost {
  title: string
  content: string
}

export interface INewPostModel extends INewPost {
  user: UserData
}

export interface INewPostBody extends INewPost {
  userId: number
}

export interface INewPostResponse {
  status: string
  message: string
  newPost: Post
}

export interface IGetPostsResponse {
  status: string
  message: string
  postList: Post[]
  total: number
}
