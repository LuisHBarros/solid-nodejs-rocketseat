import { Prisma, CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "../checkInsRepository";
import { randomUUID } from "crypto";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public items: CheckIn[];
  constructor() {
    this.items = new Array<CheckIn>();
  }
  async countCheckInsByUserId(userId: string): Promise<number> {
    const checkIns = this.items.filter((checkIn) => checkIn.user_id === userId);
    return checkIns.length;
  }
  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const checkIn = this.items.find(
      (checkIn) =>
        checkIn.user_id === userId &&
        dayjs(checkIn.created_at).isSame(date, "day")
    );
    return checkIn || null;
  }
  async findManyByUserId(userId: string): Promise<CheckIn[]> {
    const checkIns = this.items.filter((checkIn) => checkIn.user_id === userId);
    return checkIns;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };
    this.items.push(checkIn);
    return checkIn;
  }
}
