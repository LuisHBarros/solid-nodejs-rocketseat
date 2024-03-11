import { Gym, Prisma } from "@prisma/client";
// import { randomUUID } from "node:crypto";
import { IGymRepository } from "../gyms-repository";
import { randomUUID } from "node:crypto";
import { Decimal } from "@prisma/client/runtime/library";

export class InMemoryGymRepository implements IGymRepository {
  public items: Gym[];
  constructor() {
    this.items = new Array<Gym>();
  }
  async create(data: Prisma.GymUncheckedCreateInput) {
    const gym: Gym = {
      id: randomUUID(),
      title: data.title,
      description: data.description || null,
      phone: data.phone || null,
      latitude: data.latitude as Decimal,
      longitude: data.longitude as Decimal,
    };
    this.items.push(gym);
    return gym;
  }
  async findById(id: string) {
    return this.items.filter((gym) => gym.id === id)[0];
  }
}
