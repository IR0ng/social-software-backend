import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { UserData } from "./UserData"
import { Chatroom } from "./Chatroom"

@Index("user_id", ["userId"], {})
@Index("chatroom_id", ["chatroomId"], {})
@Entity("message", { schema: "simple_community_app" })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number

  @Column("int", { name: "user_id" })
  userId?: number

  @Column("int", { name: "chatroom_id" })
  chatroomId?: number

  @Column("text", { name: "content" })
  content?: string

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date

  @ManyToOne(() => UserData, (userData) => userData.messages, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user?: UserData

  @ManyToOne(() => Chatroom, (chatroom) => chatroom.messages, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "chatroom_id", referencedColumnName: "id" }])
  chatroom?: Chatroom
}
