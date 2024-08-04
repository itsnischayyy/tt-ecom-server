import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Product } from 'src/products/entities/product.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }

  @Get('name/:name')
  async findByName(@Param('name') name: string): Promise<Category> {
    return this.categoryService.findByName(name);
  }

  @Get('pagination')
  async findWithPagination(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<[Category[], number]> {
    return this.categoryService.findWithPagination(skip, take);
  }

  @Get(':id/products')
  async findProductsByCategory(@Param('id') id: number): Promise<Product[]> {
    return this.categoryService.findProductsByCategory(id);
  }
}
