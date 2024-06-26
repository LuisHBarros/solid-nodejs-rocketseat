import { Prisma, CheckIn } from "@prisma/client";

export interface ICheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string): Promise<CheckIn[]>;
  countCheckInsByUserId(userId: string): Promise<number>;
}
