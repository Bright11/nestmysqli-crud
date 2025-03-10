import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/Craete-category.dto';
import { UpdateCategoryDto } from './dto/Updatecategory.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository:Repository<Category>
    ){}


    async create(createcategoryDTO: CreateCategoryDto): Promise<Category> {
        const category = this.categoryRepository.create(createcategoryDTO);
        return this.categoryRepository.save(category);
      }
    
      async findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
      }
    
      async findById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id } });
        if (!category) {
          throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
      }
    
      async update(id: number, updatecategoryDTO:UpdateCategoryDto): Promise<Category> {
        const category = await this.findById(id); // Use findById to check if it exists
    
        Object.assign(category, updatecategoryDTO); //merge the provided data with the found category.
        return this.categoryRepository.save(updatecategoryDTO);
      }
    
      async remove(id: number): Promise<void> {
        const category = await this.findById(id); // Use findById to check if it exists
        await this.categoryRepository.remove(category);
      }
}
