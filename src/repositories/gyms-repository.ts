import { Gym } from "@prisma/client";

export interface IGymRepository {
  findById(id: string): Promise<Gym | null>;
  // create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>;
}
