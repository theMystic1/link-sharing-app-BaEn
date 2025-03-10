import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

console.log("🔍 Loaded ENV Variables:");
console.log("PORT:", process.env.PORT);
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("JWT_EXPIRES_IN:", process.env.JWT_EXPIRES_IN);

export const { PORT, MONGODB_URI, JWT_SECRET, JWT_EXPIRES_IN } = process.env;

if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is missing. Check your .env file.");
}
