import { Activity } from "~/db/entities/Activity"
import { IActivityModel } from "./types"

export const addActivity = ({
  user,
  activityType,
  osType,
  location,
}: IActivityModel) => {
  const newActivity = new Activity()
  newActivity.user = user
  newActivity.activityType = activityType
  newActivity.osType = osType
  newActivity.location = location
  return newActivity.save()
}

export const findActivityRecords = (userId: number) => {
  return Activity.findAndCount({
    where: { userId },
    order: { createdAt: "DESC" },
  })
}
