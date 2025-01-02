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

@Index("user_id", ["userId", "chatroomId"], { unique: true })
@Index("chatroom_id", ["chatroomId"], {})
@Entity("chatroom_user_relation", { schema: "simple_community_app" })
export class ChatroomUserRelation extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number

  @Column("int", { name: "user_id" })
  userId?: number

  @Column("int", { name: "chatroom_id" })
  chatroomId?: number

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date

  @ManyToOne(() => UserData, (userData) => userData.chatroomUserRelations, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user?: UserData

  @ManyToOne(() => Chatroom, (chatroom) => chatroom.chatroomUserRelations, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "chatroom_id", referencedColumnName: "id" }])
  chatroom?: Chatroom
}
