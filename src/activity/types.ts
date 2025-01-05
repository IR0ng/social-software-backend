import { Activity } from "~/db/entities/Activity"
import { UserData } from "~/db/entities/UserData"

interface IActivityDetail {
  activityType: number
  osType: number
  location: string
}

export interface IActivity extends IActivityDetail {
  userId: number
}

export interface IActivityModel extends IActivityDetail {
  user: UserData
}

export interface INewActivityResponse {
  status: string
  newActivity: Activity
}

export interface IGetActivityRecords {
  userId: number
}

export interface IGetActivityRecordsResponse {
  status: string
  total: number
  records: Activity[]
}
