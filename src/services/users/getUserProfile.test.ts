/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/inMemory/InMemoryUsersRepository";
import { InvalidCredentialsException } from "@/errors/InvalidCredentialsError";
import { GetUserProfileService } from "./getUserProfile";
import { ResourceNotExists } from "@/errors/ResourceNotExists";
import { hash } from "bcryptjs";
//unit test

describe("Get user profile", () => {
  let inMemoryUserRepository: InMemoryUsersRepository;
  let getUserProfileService: GetUserProfileService;
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    getUserProfileService = new GetUserProfileService(inMemoryUserRepository);
  });

  it("should be able to authenticate", async () => {
    const user = await inMemoryUserRepository.create({
      email: "test@example.com",
      password_hash: await hash("123456", 6),
      name: "John Doe",
    });

    const { user: userFound } = await getUserProfileService.execute({
      userId: user.id,
    });

    expect(user).have.property("id");
  });
  it("should not be able to found a user with wrong id", async () => {
    expect(
      getUserProfileService.execute({
        userId: "example",
      })
    ).rejects.toBeInstanceOf(ResourceNotExists);
  });
});
