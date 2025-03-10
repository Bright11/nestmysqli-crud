import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Module({
  imports:[TypeOrmModule.forFeature([Category])],
  providers:[CategoryService],
  exports:[CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
