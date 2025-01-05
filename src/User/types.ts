import { UserData } from "~/db/entities/UserData"

export interface IUser {
  userName: string
  email: string
  password: string
  gender: number
  introduction: string
  avatar: string
}

export interface ISignUpResponse {
  newUser: UserData
  status: string
  message: string
  token: string
}

export interface IAccount {
  email: string
  password: string
}

export interface ILoginResponse {
  status: string
  msg: string
  token: string
  user: UserData
}

export interface IAuth {
  userId: string
}
export interface IGetUserReqParams {
  userId: string
}

export interface IGetUserResponse {
  status: string
  user: UserData
}
