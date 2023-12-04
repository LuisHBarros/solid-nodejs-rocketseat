export class UserAlreadyExistsError extends Error {
  constructor() {
    console.log("error! user already exists");
    super("Email already exists");
  }
}
