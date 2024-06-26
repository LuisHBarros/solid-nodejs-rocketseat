import { IUsersRepository } from "@/repositories/usersRepository";
import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import { hash } from "bcryptjs";

interface RegisterUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: RegisterUserServiceRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
    return { user };
  }
}
