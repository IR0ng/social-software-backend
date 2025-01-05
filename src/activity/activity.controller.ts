import { IApi } from "~/types"
import {
  IActivity,
  IGetActivityRecords,
  IGetActivityRecordsResponse,
  INewActivityResponse,
} from "./types"
import errorHandler from "~/utils/errorHandler"
import {
  getActivityRecordsFeature,
  newActivityFeature,
} from "./activity.feature"

export const newActivityController: IApi<
  any,
  INewActivityResponse,
  IActivity,
  any
> = async (req, res) => {
  try {
    const newActivity = await newActivityFeature(req.body)
    res.status(200).send({
      status: "ok",
      newActivity,
    })
  } catch (error) {
    errorHandler(res, error)
  }
}

export const getActivityRecordsController: IApi<
  any,
  IGetActivityRecordsResponse,
  IGetActivityRecords,
  any
> = async (req, res) => {
  try {
    const { userId } = req.body
    const [records, total] = await getActivityRecordsFeature(userId)
    res.status(200).send({
      status: "ok",
      total,
      records,
    })
  } catch (error) {
    errorHandler(res, error)
  }
}
