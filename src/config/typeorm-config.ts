import { DataSource } from 'typeorm'
import { Category } from '../entities/Category'
import { Product } from '../entities/Product'

const host = process.env.DB_HOST || 'localhost'
const port:any = process.env.DB_PORT || 3306
const username = process.env.DB_USERNAME || 'root'
const password = process.env.DB_PASSWORD || ''
const database = process.env.DB_DATABASE || 'test'

export const AppDataSource = new DataSource({
  type: "mysql",
  host,
  port,
  username,
  password,
  database,
  logging: false,
  entities: [Product, Category],
  synchronize: false
})