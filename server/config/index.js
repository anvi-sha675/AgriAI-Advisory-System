import dotenv from "dotenv";
dotenv.config();

const required = ["JWT_SECRET", "MONGODB_URI"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`❌  Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

export const config = {
  port: parseInt(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  isDev: process.env.NODE_ENV !== "production",

  mongo: {
    uri: process.env.MONGODB_URI,
  },

  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  gemini: {
    apiKey: process.env.GEMINI_API_KEY || "",
    model: "gemini-1.5-flash",
  },

  weather: {
    apiKey: process.env.WEATHER_API_KEY || "",
    baseUrl: "https://api.openweathermap.org/data/2.5",
  },

  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  },

  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  },
};
