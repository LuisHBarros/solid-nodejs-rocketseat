import { InMemoryCheckInsRepository } from "@/repositories/inMemory/InMemoryCheckInsRepository";
import { CheckInService } from "./checkIn";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { InMemoryGymRepository } from "@/repositories/inMemory/InMemoryGymsRepository";
import { Gym } from "@prisma/client";
import { MaxDistanceError } from "@/errors/MaxDistanceError";
import { MaxCheckInsError } from "@/errors/MaxCheckInsError";

let checkInRepository = new InMemoryCheckInsRepository();
let gymRepository = new InMemoryGymRepository();
let service = new CheckInService(checkInRepository, gymRepository);

describe("Check In Service", () => {
  let gym: Gym;
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymRepository = new InMemoryGymRepository();
    service = new CheckInService(checkInRepository, gymRepository);
    gym = await gymRepository.create({
      title: "Gym 01",
      description: "Gym",
      phone: "123123123123",
      latitude: 0.0,
      longitude: 0.0,
    });
    vi.useRealTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to create a check In", async () => {
    const { checkIn } = await service.execute({
      gym_id: gym.id,
      user_id: "user-01",
      userLatitude: 0.0,
      userLongitude: 0.0,
    });
    expect(checkIn).toHaveProperty("id");
  });

  it("should no be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0, 0));

    await service.execute({
      gym_id: gym.id,
      user_id: "user-01",
      userLatitude: 0.0,
      userLongitude: 0.0,
    });
    await expect(() =>
      service.execute({
        gym_id: gym.id,
        user_id: "user-01",
        userLatitude: 0.0,
        userLongitude: 0.0,
      })
    ).rejects.toBeInstanceOf(MaxCheckInsError);
  });

  it("should no be able to check in when the user is far away from the gym", async () => {
    await expect(() =>
      service.execute({
        gym_id: gym.id,
        user_id: "user-01",
        userLatitude: 0.8,
        userLongitude: 0.5,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
