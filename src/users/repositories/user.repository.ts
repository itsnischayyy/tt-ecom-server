import { DataSource, EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  constructor(private dataSource: DataSource) {
    super(User, dataSource.manager);
  }
  // Create a user from DTO
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { ...userDetails } = createUserDto;
    console.log('userDetails', userDetails);
    const user = this.create(userDetails);
    user.id = await this.generateUniqueId();
    console.log('user', user);
    return this.save(user);
  }

  // Other methods remain unchanged
  async findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }

  async findUserWithOrders(userId: string): Promise<User> {
    return this.findOne({ where: { id: userId }, relations: ["orders"] });
  }

  async findUserWithSpecificOrder(userId: number, orderId: number): Promise<User> {
    return this.createQueryBuilder("user")
      .leftJoinAndSelect("user.orders", "order", "order.id = :orderId", { orderId })
      .where("user.id = :userId", { userId })
      .getOne();
  }

  private async generateUniqueId(): Promise<string> {
    let isUnique = false;
    let generatedId: string;
    
    while (!isUnique) {
      generatedId = uuidv4();
      const existingUser = await this.findOne({ where: { id: generatedId } });
      if (!existingUser) {
        isUnique = true;
      }
    }

    return generatedId;
  }
}
