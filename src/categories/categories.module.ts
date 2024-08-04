import { Module } from '@nestjs/common';
import {CategoryService } from './categories.service';
import {CategoryController } from './categories.controller';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repositories/category.repository';
import { ProductService } from 'src/products/products.service';
import { ProductRepository } from 'src/products/repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, ProductService, ProductRepository],
})
export class CategoriesModule {}
