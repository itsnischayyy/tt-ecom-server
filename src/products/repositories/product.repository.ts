import { EntityRepository, Repository, In } from 'typeorm';
import { Product } from '../entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  // Find a product by name
  async findByName(name: string): Promise<Product> {
    return this.findOne({ where: {name:name} });
  }

  // Find products by category
  async findByCategory(categoryId: number): Promise<Product[]> {
    return this.find({ where: { category: { id: categoryId } } });
  }

  // Find products with pagination
  async findWithPagination(skip: number, take: number): Promise<[Product[], number]> {
    return this.findAndCount({ skip, take });
  }

  // Find products by IDs
  async findByIds(ids: number[]): Promise<Product[]> {
    return this.find({ where: { id: In(ids) } });
  }
}
