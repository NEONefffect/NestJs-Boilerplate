import { config } from "dotenv";

config();

export default {
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET,
  ROOT_EMAIL: process.env.ROOT_EMAIL,
  USER_PORTAL_HOST: process.env.USER_PORTAL_HOST,
  SALT: process.env.SALT,
  DB: {
    port: +process.env.DB_PORT || 5432,
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  AWS: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: process.env.AWS_REGION,
  },
  S3_BUCKETS: {
    S3_BUCKETS_CDN: process.env.S3_BUCKETS_CDN,
  },
};
