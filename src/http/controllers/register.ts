import { UserAlreadyExistsError } from "@/errors/UserAlreadyExistsError";
import { makeRegisterService } from "@/services/factory/makeRegisterService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function registerUser(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const data = registerBodySchema.parse(req.body);

  try {
    const registerUserService = makeRegisterService();
    await registerUserService.execute(data);
  } catch (e) {
    if (e instanceof UserAlreadyExistsError) {
      return res.status(409).send({ error: e.message });
    }
    throw e;
  }
  return res.status(201).send();
}
