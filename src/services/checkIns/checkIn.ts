import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "@/repositories/checkInsRepository";
import { IGymRepository } from "@/repositories/gyms-repository";
import { ResourceNotExists } from "@/errors/ResourceNotExists";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { MaxDistanceError } from "@/errors/MaxDistanceError";
import { MaxCheckInsError } from "@/errors/MaxCheckInsError";

interface CheckInServiceRequest {
  user_id: string;
  gym_id: string;
  userLatitude: number;
  userLongitude: number;
}
const MAX_DISTANCE_IN_KM = 0.1;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CheckInServiceResponse {
  checkIn: CheckIn;
}

export class CheckInService {
  constructor(
    private checkInRepository: ICheckInsRepository,
    private gymRepository: IGymRepository
  ) {}

  async execute({
    user_id,
    gym_id,
    userLatitude,
    userLongitude,
  }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
    const gym = await this.gymRepository.findById(gym_id);

    if (!gym) throw new ResourceNotExists();
    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      user_id,
      new Date()
    );

    if (checkInOnSameDate) throw new MaxCheckInsError();

    // calculate distance between user and gym
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      {
        latitude: Number(gym.latitude),
        longitude: Number(gym.longitude),
      }
    );
    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const checkIn = await this.checkInRepository.create({ gym_id, user_id });

    return { checkIn };
  }
}
