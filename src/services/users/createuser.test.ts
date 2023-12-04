/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUserService } from "./createUser";
import { compare } from "bcrypt";
import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";
import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
//unit test

describe("Create user service", () => {
  let inMemoryUserRepository: InMemoryUsersRepository;
  let registerUserService: RegisterUserService;
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    registerUserService = new RegisterUserService(inMemoryUserRepository);
  });

  it("should be able to register", async () => {
    const { user } = await registerUserService.execute({
      name: "testUser",
      email: "testUser@test.com",
      password: "testUser",
    });

    expect(user).have.property("id");
  });

  it("should hash user password upon registration", async () => {
    const { user } = await registerUserService.execute({
      name: "testUser",
      email: "testUser@test.com",
      password: "testUser",
    });
    const isPasswordConrretlyHashed = await compare(
      "testUser",
      user.password_hash
    );
    expect(isPasswordConrretlyHashed).toBeTruthy();
  });

  it("🚨should not be able to register with same email twice", async () => {
    const email = "testUser@test.com";
    await registerUserService.execute({
      name: "testUser",
      email,
      password: "testUser",
    });
    expect(async () => {
      await registerUserService.execute({
        name: "testUser",
        email,
        password: "testUser",
      });
    }).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
