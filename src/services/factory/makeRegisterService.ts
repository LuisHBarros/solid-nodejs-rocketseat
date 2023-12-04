import { PrismaUsersRepository } from "@/repositories/prisma/prismaUsersRepository";
import { RegisterUserService } from "../users/createUser";

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository();
  const registerService = new RegisterUserService(usersRepository);
  return registerService;
}
