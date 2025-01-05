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

@Index("follower_id", ["followerId", "followingId"], { unique: true })
@Index("following_id", ["followingId"], {})
@Entity("follow_ship", { schema: "simple_community_app" })
export class FollowShip extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number

  @Column("int", { name: "follower_id" })
  followerId?: number

  @Column("int", { name: "following_id" })
  followingId?: number

  @Column("tinyint", {
    name: "follow_status",
    nullable: true,
    default: () => "'0'",
  })
  followStatus?: number | null

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

  @ManyToOne(() => UserData, (userData) => userData.following, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "follower_id", referencedColumnName: "id" }])
  follower?: UserData

  @ManyToOne(() => UserData, (userData) => userData.follower, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "following_id", referencedColumnName: "id" }])
  following?: UserData
}
