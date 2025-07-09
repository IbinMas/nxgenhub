import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { validateEnvVars } from "./utils/emailUtils.js";
import { prisma } from "./utils/prisma.js";
import emailRoutes from "./routes/emailRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/// Load environment variables with flexible path
const defaultEnvPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(__dirname, "../../.env")
    : path.resolve(__dirname, "../.env");

// 👇 Allow override via ENV_PATH
const envPath = process.env.ENV_PATH || defaultEnvPath;
dotenv.config({ path: envPath });

// ✅ Log AFTER loading dotenv
console.log("SMTP ENV VARS:", {
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_FROM: process.env.SMTP_FROM,
});

// Validate required environment variables
validateEnvVars();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middleware
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(origin => origin.trim())
  : [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://dazzling-kilby2-wfuur.view-2.tempo-dev.app",
    ];

console.log("🌐 CORS Origins:", corsOrigins);

const corsOptions = {
  origin: corsOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api", emailRoutes);
app.use("/", healthRoutes);

// Graceful shutdown
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email endpoint: http://localhost:${PORT}/api/send-email`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
