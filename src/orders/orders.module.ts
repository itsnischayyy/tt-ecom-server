import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrderRepository } from './repositories/order.repository';
import { UserService } from 'src/users/users.service';
import { ProductService } from 'src/products/products.service';
import { UserRepository } from 'src/users/repositories/user.repository';
import { ProductRepository } from 'src/products/repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService, OrderRepository, UserService, ProductService, UserRepository, ProductRepository],
})
export class OrdersModule {}
