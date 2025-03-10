
// src/product/dto/create-product.dto.ts
import { IsString, IsNotEmpty, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

//   @IsOptional()
@IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds?: number[];
}
