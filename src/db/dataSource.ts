import "dotenv/config"
import path from "path"
import { DataSource } from "typeorm"

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  database: process.env.DB,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  synchronize: false,
  entities: [path.join(__dirname, "/entities/*{.ts,.js}")],
  migrations: [path.join(__dirname, "/migrations/*{.ts,.js}")],
})

export default dataSource
