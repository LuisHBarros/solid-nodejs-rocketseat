import { User, Prisma } from "@prisma/client";
import { IUsersRepository } from "../usersRepository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[];
  constructor() {
    this.items = new Array<User>();
  }
  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };
    this.items.push(user);
    return user;
  }
  async findByEmail(email: string) {
    const user = this.items.filter((user) => user.email === email)[0];
    return user;
  }
  async findById(id: string) {
    return this.items.filter((user) => user.id === id)[0];
  }
}
