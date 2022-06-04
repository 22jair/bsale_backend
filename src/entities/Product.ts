import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, Index, JoinColumn } from "typeorm";
import { Category } from "./Category";


@Entity()
export class Product extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string;

  @Column()
  url_image: string;

  @Column()
  price: number;

  @Column()
  discount: number;
  
  @ManyToOne(type => Category, category => category.products) 
  @JoinColumn({ name: "category" })
  category: Category;

}