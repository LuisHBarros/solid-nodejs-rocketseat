export class MaxCheckInsError extends Error {
  constructor() {
    super("You reached the maximum number of check-ins for today.");
    this.name = "MaxCheckInsError";
  }
}
