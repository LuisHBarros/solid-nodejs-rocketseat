import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, req, res) => {
  if (error instanceof ZodError) {
    return res.status(400).send({
      message: "validation error",
      issues: error.format(),
    });
  }
  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Here we should log log to an external tool like DataDog/NewRelic/Sentry
  }

  return res.status(500).send({ message: "Internal server error" });
});
