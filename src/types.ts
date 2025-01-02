import { Request, Response } from "express"

export enum RESPONSE_CODE {
  VALIDATE_ERROR = "4001",
  USER_DATA_ERROR = "4002",
  DATA_DUPLICATE = "4003",
  TARGET_NOT_EXISTS = "4004",
  NO_PERMISSION = "4005",
  UNKNOWN_ERROR = "5000",
}

interface IRequest<T> extends Request {
  body: T
}

interface IFeatureError {
  code: RESPONSE_CODE
  message: string | unknown
}

export interface IApi<APIRequest, APIResponse> {
  (req: IRequest<APIRequest>, res: Response<APIResponse | IFeatureError>): void
}

export enum GENDER {
  "MALE" = 0,
  "FEMALE" = 1,
  "UNKNOWN" = 2,
}

export interface IAccount {
  email: string
  password: string
}

export interface IPagination {
  page: number
  count: number
}

interface IceCandidateData {
  label: number | null
  id: string | null
  candidate: string
}
export interface ClientToServerEvents {
  join: (roomId: string) => void
  offer: (roomId: string, desc: RTCSessionDescription) => void
  answer: (roomId: string, desc: RTCSessionDescription) => void
  iceCandidate: (roomId: string, data: IceCandidateData) => void
  leave: (roomId: string) => void
}

export interface ServerToClientEvents {
  ready: (message: string) => void
  offer: (desc: RTCSessionDescription) => void
  answer: (desc: RTCSessionDescription) => void
  iceCandidate: (data: IceCandidateData) => void
  leave: () => void
}
