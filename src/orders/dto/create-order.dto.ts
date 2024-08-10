import { IsNotEmpty, IsEnum, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNumber()
  total: number;

  @IsArray()
  @ArrayNotEmpty()
  productIds: number[];
}
