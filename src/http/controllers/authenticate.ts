import { InvalidCredentialsException } from "@/errors/InvalidCredentialsError";
import { makeAuthenticateService } from "@/services/factory/makeAuthenticateService";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const data = registerBodySchema.parse(req.body);

  try {
    const autenticateService = makeAuthenticateService();
    await autenticateService.execute(data);
  } catch (e) {
    if (e instanceof InvalidCredentialsException) {
      return res.status(409).send({ error: e.message });
    }
    throw e;
  }
  return res.status(200).send();
}
