/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";
import { AuthenticateService } from "./authenticate";
import { InvalidCredentialsException } from "@/errors/InvalidCredentialsError";
//unit test

describe("Authenticate service", () => {
  let inMemoryUserRepository: InMemoryUsersRepository;
  let autenticateService: AuthenticateService;
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    autenticateService = new AuthenticateService(inMemoryUserRepository);
  });

  it("should be able to authenticate", async () => {
    await inMemoryUserRepository.create({
      email: "test@example.com",
      password_hash: await hash("123456", 6),
      name: "John Doe",
    });

    const { user } = await autenticateService.execute({
      email: "test@example.com",
      password: "123456",
    });

    expect(user).have.property("id");
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      autenticateService.execute({
        email: "test@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsException);
  });
});
