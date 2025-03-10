import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/Craete-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}


    @Post()
  async create(@Body() createcategoryDTO: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createcategoryDTO);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoryService.update(id, categoryData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.categoryService.remove(id);
  }
}
