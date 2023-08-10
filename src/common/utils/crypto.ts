import { createCipheriv, createDecipheriv, createHash } from "crypto";

import config from "../../config";

const algorithm = "aes256";
const iv = Buffer.alloc(16, 0);
const key = createHash("sha256").update(config.SALT).digest();

const encrypt = (data: string) => {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

const decrypt = (data: string) => {
  const decipher = createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
export { encrypt, decrypt };
