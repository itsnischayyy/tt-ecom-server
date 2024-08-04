import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './repositories/category.repository';
import { ProductService } from 'src/products/products.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    private productService: ProductService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne( {where: {id: id}, relations: ['products'] });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto);
    const updatedCategory = await this.categoryRepository.findOne( {where: {id: id}, relations: ['products'] });
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updatedCategory;
  }

  async remove(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findByName(name);
    if (!category) {
      throw new NotFoundException(`Category with name ${name} not found`);
    }
    return category;
  }

  async findWithPagination(skip: number, take: number): Promise<[Category[], number]> {
    return this.categoryRepository.findWithPagination(skip, take);
  }

  async findProductsByCategory(id: number): Promise<Product[]> {
    const category = await this.findOne(id);
    return this.productService.findByCategory(category.id);
  }
}
