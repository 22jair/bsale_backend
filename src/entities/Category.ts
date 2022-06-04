import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./Product";


@Entity()
export class Category extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string;

  @OneToMany(type => Product, product => product.category)
  products: Product
}