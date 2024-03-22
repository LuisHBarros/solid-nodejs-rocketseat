import { InMemoryCheckInsRepository } from "@/repositories/inMemory/InMemoryCheckInsRepository";
import { CheckInService } from "./checkIn";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { InMemoryGymRepository } from "@/repositories/inMemory/InMemoryGymsRepository";
import { Gym } from "@prisma/client";
import { FetchCheckInHistoryService } from "./fetchCheckInHistory";

let checkInRepository = new InMemoryCheckInsRepository();
let gymRepository = new InMemoryGymRepository();
let checkInService = new CheckInService(checkInRepository, gymRepository);
let service = new FetchCheckInHistoryService(checkInRepository);

describe("Check In Service", () => {
  let gym: Gym;
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    gymRepository = new InMemoryGymRepository();
    checkInService = new CheckInService(checkInRepository, gymRepository);
    service = new FetchCheckInHistoryService(checkInRepository);
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
  it("should be able to fetch check in history", async () => {
    await checkInService.execute({
      gym_id: gym.id,
      user_id: "user-01",
      userLatitude: 0.0,
      userLongitude: 0.0,
    });
    const response = await service.execute({ user_id: "user-01" });
    expect(response.checkIns[0]).toHaveProperty("id");
    expect(response.checkIns).toEqual([
      expect.objectContaining({ gym_id: gym.id }),
    ]);
  });
});
