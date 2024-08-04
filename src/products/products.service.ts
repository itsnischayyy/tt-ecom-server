import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { ProductRepository } from './repositories/product.repository';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, ...productData } = createProductDto;
    const category = await this.getCategory(categoryId);
    
    const product = this.productRepository.create({
      ...productData,
      category
    });
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: {id : id}});
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const { categoryId, ...productData } = updateProductDto;
    
    if (categoryId) {
      const category = await this.getCategory(categoryId);
      // productData.category = category;
    }
    
    await this.productRepository.update(id, productData);
    const updatedProduct = await this.productRepository.findOne({ where: {id : id}});
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async findByName(name: string): Promise<Product> {
    const product = await this.productRepository.findByName(name);
    if (!product) {
      throw new NotFoundException(`Product with name ${name} not found`);
    }
    return product;
  }

  async findByCategory(categoryId: number): Promise<Product[]> {
    const products = await this.productRepository.findByCategory(categoryId);
    if (products.length === 0) {
      throw new NotFoundException(`No products found for category ID ${categoryId}`);
    }
    return products;
  }

  async findWithPagination(skip: number, take: number): Promise<[Product[], number]> {
    return this.productRepository.findWithPagination(skip, take);
  }

  async findByIds(ids: number[]): Promise<Product[]> {
    const products = await this.productRepository.findByIds(ids);
    if (products.length === 0) {
      throw new NotFoundException(`No products found for the provided IDs`);
    }
    return products;
  }

  private async getCategory(categoryId: number): Promise<Category> {
    const category = await this.productRepository.manager.findOne(Category,{ where: {id: categoryId}});
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    return category;
  }
}
