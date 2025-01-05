import { findUserBy } from "~/user/user.model"
import { IActivity, IGetActivityRecords } from "./types"
import FeatureError from "~/utils/FeatureError"
import { RESPONSE_CODE } from "~/types"
import { addActivity, findActivityRecords } from "./activity.model"
import { Activity } from "~/db/entities/Activity"

export const newActivityFeature = async (
  data: IActivity,
): Promise<Activity> => {
  try {
    const { userId, activityType, osType, location } = data
    const user = await findUserBy({ id: userId })
    if (!user) {
      throw new FeatureError(
        401,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User not found.",
      )
    }
    const newActivity = await addActivity({
      user,
      activityType,
      osType,
      location,
    })
    return newActivity
  } catch (error) {
    throw error
  }
}

export const getActivityRecordsFeature = async (
  userId: number,
): Promise<[Activity[], number]> => {
  try {
    const user = await findUserBy({ id: userId })
    if (!user) {
      throw new FeatureError(
        401,
        RESPONSE_CODE.USER_DATA_ERROR,
        "User not found.",
      )
    }
    const records = await findActivityRecords(user.id!)
    return records
  } catch (error) {
    throw error
  }
}
