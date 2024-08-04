import { IsNotEmpty, IsDecimal, IsInt, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsDecimal()
  price: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
