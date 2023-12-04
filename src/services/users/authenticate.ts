import { InvalidCredentialsException } from "@/errors/InvalidCredentialsError";
import { IUsersRepository } from "@/repositories/usersRepository";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private usersRespository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRespository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsException();
    }

    const doesPasswordsMatches = await compare(password, user.password_hash);
    if (!doesPasswordsMatches) {
      throw new InvalidCredentialsException();
    }
    return { user };
  }
}
