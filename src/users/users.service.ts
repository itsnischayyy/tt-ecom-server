import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';


@Injectable()

export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToClass(User, createUserDto);
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne( {where: {id}});
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOne( {where: {id}});
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findUserWithOrders(userId: number): Promise<User> {
    const user = await this.userRepository.findUserWithOrders(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }

  async findUserWithSpecificOrder(userId: number, orderId: number): Promise<User> {
    const user = await this.userRepository.findUserWithSpecificOrder(userId, orderId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} and order ID ${orderId} not found`);
    }
    return user;
  }

  async findWithPagination(skip: number, take: number): Promise<[User[], number]> {
    return this.userRepository.findAndCount({ skip, take });
  }
}
