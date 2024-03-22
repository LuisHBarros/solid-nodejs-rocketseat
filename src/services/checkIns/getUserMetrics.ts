import { ICheckInsRepository } from "@/repositories/checkInsRepository";
import { CheckIn } from "@prisma/client";

interface GetUserMetricsServiceRequest {
  user_id: string;
}

interface GetUserMetricsServiceResponse {
  checkInsCount: number;
}

export class GetUserMetricsService {
  constructor(private checkInRepository: ICheckInsRepository) {}

  async execute({
    user_id,
  }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
    const checkIns = await this.checkInRepository.countCheckInsByUserId(
      user_id
    );

    return { checkInsCount: checkIns };
  }
}
