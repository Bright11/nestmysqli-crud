import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CategoryService } from 'src/category/category.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/CreateProduct.dto';
import { CreateCategoryDto } from 'src/category/dto/Craete-category.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository:Repository<Product>,
        private categoryService: CategoryService // Inject CategoryService
    ){}


    async create(createProductDTO: CreateProductDto, categoryIds: number[]): Promise<Product> {
        const product = this.productRepository.create(createProductDTO);
    
        if (categoryIds && categoryIds.length > 0) {
            try {
                product.categories = await Promise.all(
                    categoryIds.map((id) => this.categoryService.findById(id)),
                );
            } catch (error) {
                throw new BadRequestException("One or more category IDs are invalid.");
            }
        }
    
        return this.productRepository.save(product);
    }
    
      async findAll(): Promise<Product[]> {
        return this.productRepository.find({ relations: ['categories'] }); // Eager load categories
      }
    
      async findById(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({
          where: { id },
          relations: ['categories'],
        });
        if (!product) {
          throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
      }
    
      async update(id: number, productData: Partial<Product>, categoryIds: number[]): Promise<Product> {
        const product = await this.findById(id);
    
        Object.assign(product, productData);
    
        if (categoryIds && categoryIds.length > 0) {
          product.categories = await Promise.all(
            categoryIds.map((categoryId) => this.categoryService.findById(categoryId)),
          );
        } else {
            product.categories = []; // clear categories if none were provided.
        }
    
        return this.productRepository.save(product);
      }
    
      async remove(id: number): Promise<void> {
        const product = await this.findById(id);
        await this.productRepository.remove(product);
      }
}
