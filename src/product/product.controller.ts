import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateCategoryDto } from 'src/category/dto/Craete-category.dto';
import { CreateProductDto } from './dto/CreateProduct.dto';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){}


    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
      try {
        const categoryIds = createProductDto.categoryIds || []; // Provide a default value
        return this.productService.create(createProductDto, categoryIds);
      } catch (error) {
        if (error instanceof BadRequestException) {
          throw error;
        }
        throw error;
      }
    }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() productData: Partial<Product>,
    @Query('categoryIds') categoryIds: string,
  ): Promise<Product> {
    const categoryIdArray = categoryIds ? categoryIds.split(',').map(Number) : [];
    return this.productService.update(id, productData, categoryIdArray);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.productService.remove(id);
  }
}
