import { IUser } from "~/user/types"
import bcrypt from "bcrypt"
import { IAccount, RESPONSE_CODE } from "~/types"
import { generateToken } from "~/utils/account"
import { addUser, findUserBy } from "./user.model"
import FeatureError from "~/utils/FeatureError"
import { UserData } from "~/db/entities/UserData"

export const signUpFeature = async (
  data: IUser,
): Promise<{ newUser: UserData; token: string }> => {
  try {
    const { email, password, userName } = data
    const isAccountExist = await findUserBy({ email, userName })
    if (isAccountExist) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.DATA_DUPLICATE,
        `User name or email has been created`,
      )
    }

    const encryptedPassword = await bcrypt.hash(password, 10)
    const newUser = await addUser({
      ...data,
      password: encryptedPassword,
    })

    const token = generateToken(newUser)

    return { newUser, token }
  } catch (error) {
    throw error
  }
}

export const loginFeature = async ({
  email,
  password,
}: IAccount): Promise<{ user: UserData; token: string }> => {
  try {
    const user = await findUserBy({ email })
    if (!user) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User's email or password is not correct",
      )
    }

    const isPasswordCorrect = await bcrypt.compare(password!, user.password!)
    if (!isPasswordCorrect) {
      throw new FeatureError(
        403,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User's email or password is not correct",
      )
    }

    const token = generateToken(user)

    return {
      user,
      token,
    }
  } catch (error) {
    throw error
  }
}

export const getUserFeature = async ({
  userId,
}: {
  userId: number
}): Promise<UserData> => {
  try {
    const user = await findUserBy({ id: userId })
    if (!user) {
      throw new FeatureError(
        400,
        RESPONSE_CODE.TARGET_NOT_EXISTS,
        "User not found.",
      )
    }
    return user
  } catch (error) {
    throw error
  }
}
