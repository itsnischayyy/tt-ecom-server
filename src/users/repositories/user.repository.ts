import { EntityRepository, Repository } from "typeorm";
import { Order } from "src/orders/entities/order.entity";
import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Find a user by email
  async findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  }

  // Find a user with their orders
  async findUserWithOrders(userId: number): Promise<User> {
    return this.findOne({ where: { id: userId }, relations: ["orders"] });
  }

  // Find a user and their specific order
  async findUserWithSpecificOrder(
    userId: number,
    orderId: number
  ): Promise<User> {
    return this.createQueryBuilder("user")
      .leftJoinAndSelect("user.orders", "order", "order.id = :orderId", {
        orderId,
      })
      .where("user.id = :userId", { userId })
      .getOne();
  }
}
