import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [ TypeOrmModule.forRoot(dataSourceOptions), UsersModule, ProductsModule, OrdersModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
