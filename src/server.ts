import { app } from "./app";
import { env } from "@/env";

const port = 3000;

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => console.log("🌱listening on port " + port));
