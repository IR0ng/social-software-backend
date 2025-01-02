import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { UserData } from "./UserData"
import { PostComment } from "./PostComment"
import { PostLike } from "./PostLike"

@Index("user_id", ["userId"], {})
@Entity("post", { schema: "simple_community_app" })
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number

  @Column("int", { name: "user_id" })
  userId?: number

  @Column("varchar", { name: "title", length: 20 })
  title?: string

  @Column("text", { name: "content" })
  content?: string

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date

  @Column("timestamp", {
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date

  @ManyToOne(() => UserData, (userData) => userData.posts, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user?: UserData

  @OneToMany(() => PostComment, (postComment) => postComment.post)
  postComments?: PostComment[]

  @OneToMany(() => PostLike, (postLike) => postLike.post)
  postLikes?: PostLike[]
}
