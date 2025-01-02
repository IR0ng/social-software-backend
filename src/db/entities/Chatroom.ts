import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { ChatroomUserRelation } from "./ChatroomUserRelation"
import { Message } from "./Message"

@Entity("chatroom", { schema: "simple_community_app" })
export class Chatroom extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number

  @Column("varchar", { name: "room_name", length: 10 })
  roomName?: string

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date

  @OneToMany(
    () => ChatroomUserRelation,
    (chatroomUserRelation) => chatroomUserRelation.chatroom,
  )
  chatroomUserRelations?: ChatroomUserRelation[]

  @OneToMany(() => Message, (message) => message.chatroom)
  messages?: Message[]
}
