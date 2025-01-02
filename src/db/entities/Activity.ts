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

@Index("user_id", ["userId"], {})
@Entity("activity", { schema: "simple_community_app" })
export class Activity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id?: number

  @Column("int", { name: "user_id" })
  userId?: number

  @Column("tinyint", { name: "activity_type" })
  activityType?: number

  @Column("tinyint", { name: "os_type" })
  osType?: number

  @Column("varchar", { name: "location", length: 100 })
  location?: string

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date

  @ManyToOne(() => UserData, (userData) => userData.activities, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user?: UserData
}
