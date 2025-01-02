import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Activity } from "./Activity"
import { ChatroomUserRelation } from "./ChatroomUserRelation"
import { FollowShip } from "./FollowShip"
import { Message } from "./Message"
import { Post } from "./Post"
import { PostComment } from "./PostComment"
import { PostLike } from "./PostLike"

@Entity("user_data", { schema: "simple_community_app" })
export class UserData extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number

  @Column("varchar", { name: "name", length: 50 })
  name?: string

  @Column("tinyint", { name: "gender" })
  gender?: number

  @Column("varchar", { name: "email", length: 255 })
  email?: string

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date

  @Column("char", { name: "password", nullable: true, length: 72 })
  password?: string | null

  @Column("varchar", { name: "avatar", nullable: true, length: 2083 })
  avatar?: string | null

  @Column("text", { name: "introduction", nullable: true })
  introduction?: string | null

  @OneToMany(() => Activity, (activity) => activity.user)
  activities?: Activity[]

  @OneToMany(
    () => ChatroomUserRelation,
    (chatroomUserRelation) => chatroomUserRelation.user,
  )
  chatroomUserRelations?: ChatroomUserRelation[]

  @OneToMany(() => FollowShip, (followShip) => followShip.follower)
  followShips?: FollowShip[]

  @OneToMany(() => FollowShip, (followShip) => followShip.following)
  followShips2?: FollowShip[]

  @OneToMany(() => Message, (message) => message.user)
  messages?: Message[]

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[]

  @OneToMany(() => PostComment, (postComment) => postComment.user)
  postComments?: PostComment[]

  @OneToMany(() => PostLike, (postLike) => postLike.user)
  postLikes?: PostLike[]

  toJSON() {
    delete this.password
    return this
  }
}
