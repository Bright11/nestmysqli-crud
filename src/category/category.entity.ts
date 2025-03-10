import { Product } from 'src/product/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}