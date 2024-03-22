import { ICheckInsRepository } from "@/repositories/checkInsRepository";
import { CheckIn } from "@prisma/client";

interface FetchCheckInHistoryServiceRequest {
  user_id: string;
}

interface FetchCheckInHistoryServiceRequestResponse {
  checkIns: CheckIn[];
}

export class FetchCheckInHistoryService {
  constructor(private checkInRepository: ICheckInsRepository) {}

  async execute({
    user_id,
  }: FetchCheckInHistoryServiceRequest): Promise<FetchCheckInHistoryServiceRequestResponse> {
    const checkIns = await this.checkInRepository.findManyByUserId(user_id);

    return { checkIns };
  }
}
