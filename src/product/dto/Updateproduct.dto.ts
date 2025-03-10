
// src/product/dto/update-product.dto.ts
import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds?: number[];
}