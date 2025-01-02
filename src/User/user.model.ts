import { UserData } from "~/db/entities/UserData"
import { IUser } from "./types"

export const addUser = (data: IUser) => {
  const { userName, password, email, avatar, gender, introduction } = data
  const newMember = new UserData()
  newMember.name = userName
  newMember.password = password
  newMember.email = email
  newMember.avatar = avatar
  newMember.gender = gender
  newMember.introduction = introduction
  return newMember.save()
}

export const findUserBy = async ({
  id,
  email,
  userName,
}: {
  id?: number
  email?: string
  userName?: string
}) => {
  return UserData.findOne({
    where: [{ id }, { name: userName }, { email }],
  })
}
