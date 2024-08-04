import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/order.repository';
import { UserService } from 'src/users/users.service';
import { ProductService } from 'src/products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private userService: UserService,
    private productService: ProductService,
  ) { }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, productIds, ...orderData } = createOrderDto;

    const user = await this.userService.findOne(userId);
    const products = await this.productService.findByIds(productIds);

    const total = products.reduce((sum, product) => sum + product.price, 0);

    const order = this.orderRepository.create({
      ...orderData,
      user,
      products,
      total,
    });

    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['products', 'user'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id: id }, relations: ['products', 'user'] });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const { userId, productIds, ...orderData } = updateOrderDto;

    const user = await this.userService.findOne(userId);
    const products = await this.productService.findByIds(productIds);

    const total = products.reduce((sum, product) => sum + product.price, 0);

    await this.orderRepository.update(id, {
      ...orderData,
      user,
      products,
      total,
    });

    const updatedOrder = await this.orderRepository.findOne({ where: { id: id }, relations: ['products', 'user'] });
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return updatedOrder;
  }

  async remove(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }

  async findByUser(userId: number): Promise<Order[]> {
    const orders = await this.orderRepository.findByUser(userId);
    if (orders.length === 0) {
      throw new NotFoundException(`No orders found for user ID ${userId}`);
    }
    return orders;
  }

  async findWithPagination(skip: number, take: number): Promise<[Order[], number]> {
    return this.orderRepository.findWithPagination(skip, take);
  }

  async findOrderWithSpecificProduct(orderId: number, productId: number): Promise<Order> {
    const order = await this.orderRepository.findOrderWithSpecificProduct(orderId, productId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} and product ID ${productId} not found`);
    }
    return order;
  }
}
