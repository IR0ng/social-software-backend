import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Post } from "./Post"
import { UserData } from "./UserData"

@Index("post_id", ["postId", "userId"], { unique: true })
@Index("user_id", ["userId"], {})
@Entity("post_like", { schema: "simple_community_app" })
export class PostLike extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number

  @Column("int", { name: "post_id" })
  postId?: number

  @Column("int", { name: "user_id" })
  userId?: number

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date

  @ManyToOne(() => Post, (post) => post.postLikes, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "post_id", referencedColumnName: "id" }])
  post?: Post

  @ManyToOne(() => UserData, (userData) => userData.postLikes, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user?: UserData
}
