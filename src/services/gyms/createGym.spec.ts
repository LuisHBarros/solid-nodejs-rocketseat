import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymService } from "./createGym";
import { InMemoryGymRepository } from "@/repositories/inMemory/InMemoryGymsRepository";

let gymsRepository: InMemoryGymRepository;
let sut: CreateGymService;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymRepository();
    sut = new CreateGymService(gymsRepository);
  });

  it("should to create gym", async () => {
    const { gym } = await sut.execute({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
