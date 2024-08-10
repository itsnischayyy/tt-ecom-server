import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {

  // Find orders by user
  async findByUser(userId: string): Promise<Order[]> {
    return this.find({ where: { user: { id: userId } }, relations: ['products', 'user'] });
  }

  // Find orders with pagination
  async findWithPagination(skip: number, take: number): Promise<[Order[], number]> {
    return this.findAndCount({ skip, take, relations: ['products', 'user'] });
  }

  // Find order with specific product
  async findOrderWithSpecificProduct(orderId: number, productId: number): Promise<Order> {
    return this.createQueryBuilder('order')
      .leftJoinAndSelect('order.products', 'product', 'product.id = :productId', { productId })
      .where('order.id = :orderId', { orderId })
      .getOne();
  }
}
