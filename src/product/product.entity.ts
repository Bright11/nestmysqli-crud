import { Category } from 'src/category/category.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';


@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}