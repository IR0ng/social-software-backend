import { IAccount, IApi } from "~/types"
import { getUserFeature, loginFeature, signUpFeature } from "./user.feature"
import {
  IAuth,
  IGetUserReqParams,
  IGetUserResponse,
  ILoginResponse,
  ISignUpResponse,
  IUser,
} from "./types"
import errorHandler from "~/utils/errorHandler"

export const signUpController: IApi<any, ISignUpResponse, IUser, any> = async (
  req,
  res,
) => {
  try {
    const { newUser, token } = await signUpFeature({ ...req.body })
    return res.status(200).send({
      newUser,
      status: "ok",
      message: `${newUser.name} sign up successful!`,
      token,
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

export const loginController: IApi<any, ILoginResponse, IAccount, any> = async (
  req,
  res,
) => {
  try {
    const { email, password } = req.body
    const { user, token } = await loginFeature({ email, password })

    return res.status(200).send({
      status: "login_successfully",
      msg: "Login successful",
      token,
      user,
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

export const getUserByAuthController: IApi<
  any,
  IGetUserResponse,
  IAuth,
  any
> = async (req, res) => {
  try {
    const { userId } = req.body
    const user = await getUserFeature({ userId: Number(userId) })
    res.status(200).send({
      status: "ok",
      user,
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

export const getUserController: IApi<
  IGetUserReqParams,
  IGetUserResponse,
  any,
  any
> = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await getUserFeature({ userId: Number(userId) })
    res.status(200).send({
      status: "ok",
      user,
    })
  } catch (error) {
    errorHandler(res, error)
  }
}
