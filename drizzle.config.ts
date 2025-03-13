import { defineConfig } from "drizzle-kit";

import config from "config";

export default defineConfig({
  schema: "./src/database/database-schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: config.DB.host,
    port: config.DB.port,
    user: config.DB.username,
    password: config.DB.password,
    database: config.DB.database,
    ssl: false,
  },
});
