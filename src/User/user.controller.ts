import { IAccount, IApi, RESPONSE_CODE } from "~/types"
import FeatureError from "~/utils/FeatureError"
import { loginFeature, signUpFeature } from "./user.feature"
import { ILoginResponse, ISignUpResponse, IUser } from "./types"

export const signUpController: IApi<IUser, ISignUpResponse> = async (
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
    if (error instanceof FeatureError) {
      res.status(error.serverStatus).send({
        status: "error",
        code: error.code,
        message: error.message,
      })
    } else {
      res.status(500).send({
        status: "error",
        code: RESPONSE_CODE.UNKNOWN_ERROR,
        message: error,
      })
      throw error
    }
  }
}

export const login: IApi<IAccount, ILoginResponse> = async (req, res) => {
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
    if (error instanceof FeatureError) {
      res.status(error.serverStatus).send({
        status: "error",
        code: error.code,
        message: error.message,
      })
    } else {
      res.status(500).send({
        status: "error",
        code: RESPONSE_CODE.UNKNOWN_ERROR,
        message: error,
      })
      throw error
    }
  }
}
