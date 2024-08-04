import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {

  // Find a category by name
  async findByName(name: string): Promise<Category> {
    return this.findOne({ where: {name:name} });
  }

  // Find categories with pagination
  async findWithPagination(skip: number, take: number): Promise<[Category[], number]> {
    return this.findAndCount({ skip, take });
  }
}
