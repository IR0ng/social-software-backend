import jwt from "jsonwebtoken"
import { UserData } from "~/db/entities/UserData"

export const generateToken = (user: UserData) => {
  return (
    "Bearer " +
    jwt.sign(
      { userName: user.name, email: user.email, id: user.id },
      String(process.env.TOKEN),
      { expiresIn: "30 day" },
    )
  )
}
