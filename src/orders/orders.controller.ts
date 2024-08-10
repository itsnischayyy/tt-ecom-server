import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.orderService.remove(id);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Order[]> {
    return this.orderService.findByUser(userId);
  }

  @Get('pagination')
  async findWithPagination(
    @Query('skip') skip: number,
    @Query('take') take: number,
  ): Promise<[Order[], number]> {
    return this.orderService.findWithPagination(skip, take);
  }

  @Get(':orderId/product/:productId')
  async findOrderWithSpecificProduct(
    @Param('orderId') orderId: number,
    @Param('productId') productId: number,
  ): Promise<Order> {
    return this.orderService.findOrderWithSpecificProduct(orderId, productId);
  }
}
