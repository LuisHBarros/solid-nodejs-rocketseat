import { ResourceNotExists } from "@/errors/ResourceNotExists";
import { IUsersRepository } from "@/repositories/usersRepository";
import { User } from "@prisma/client";
interface GetUserProfileRequest {
  userId: string;
}

interface GetUserProfileResponse {
  user: User;
}

export class GetUserProfileService {
  constructor(private usersRespository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.usersRespository.findById(userId);
    if (!user) {
      throw new ResourceNotExists();
    }
    return { user };
  }
}
