import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Product> {
    return this.productService.findByName(name);
  }

  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: number): Promise<Product[]> {
    return this.productService.findByCategory(categoryId);
  }

  @Get('pagination')
  async findWithPagination(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<[Product[], number]> {
    return this.productService.findWithPagination(skip, take);
  }
}
