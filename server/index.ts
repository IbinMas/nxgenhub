import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import pkg, { PoolClient } from "pg";
const { Pool } = pkg;

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

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Test database connection
pool.connect((err, client, release) => {
  if (err || !client) {
    console.error("❌ Database connection error:", err?.stack || err);
    return;
  }
  console.log("✅ Database connected successfully");
  release();
});


const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Validate required environment variables
const requiredEnvVars = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName],
);

if (missingEnvVars.length > 0) {
  console.error(
    "❌ Missing required environment variables:",
    missingEnvVars.join(", "),
  );
  console.error(
    "Please check your .env file and ensure all SMTP credentials are provided.",
  );
  process.exit(1);
}

// Middleware
const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",")
    : [
        "http://localhost:3000",
        "http://localhost:5173",
        "https://dazzling-kilby2-wfuur.view-2.tempo-dev.app",
      ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// Email interface
interface EmailRequest {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  smtpConfig?: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
  sendConfirmation?: boolean;
  confirmationEmail?: {
    to: string;
    from: string;
    subject: string;
    html: string;
    text: string;
  };
}

interface EmailResponse {
  success: boolean;
  error?: string;
  confirmationSent?: boolean;
}

// Helper to create transporter
function createTransporter() {
  const smtpConfig = {
    host: process.env.SMTP_HOST as string,
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASS as string,
    },
  };
  return nodemailer.createTransport({
    host: smtpConfig.host,
    port: smtpConfig.port,
    secure: smtpConfig.secure,
    auth: smtpConfig.auth,
    tls: { rejectUnauthorized: false },
  });
}

// Endpoint handler
type Handler = (
  req: express.Request,
  res: express.Response,
) => Promise<void>;

const sendMailHandler: Handler = async (req, res) => {
  console.log("📧 Received email request:", req.path);
  try {
    const emailData = req.body as EmailRequest;

    if (!emailData.to || !emailData.subject || (!emailData.html && !emailData.text)) {
      res.status(400).json({ success: false, error: "Missing required fields" });
      return;
    }

    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    const mailOptions = {
      from: process.env.SMTP_FROM as string,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      replyTo: emailData.replyTo || (process.env.SMTP_FROM as string),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Main email sent:", info.messageId);

    let confirmationSent = false;
    if (emailData.sendConfirmation && emailData.confirmationEmail) {
      try {
        const confirmOpts = emailData.confirmationEmail;
        await transporter.sendMail(confirmOpts);
        confirmationSent = true;
        console.log("✅ Confirmation email sent");
      } catch (err) {
        console.warn("⚠️ Confirmation email failed:", (err as Error).message);
      }
    }

    res.json({ success: true, confirmationSent } as EmailResponse);
  } catch (err) {
    console.error("❌ Email sending failed:", (err as Error).message);
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};

app.post("/api/send-email", sendMailHandler);
app.post("/send", sendMailHandler);

// Health check endpoint with database status
app.get("/health", async (req, res) => {
  try {
    const dbResult = await pool.query("SELECT NOW()");
    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      database: "connected",
      dbTime: dbResult.rows[0].now,
    });
  } catch (error) {
    console.error("Health check DB error:", (error as Error).message);
    res.status(503).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: (error as Error).message,
    });
  }
});

// Graceful shutdown
process.on("SIGTERM", () => process.exit(0));
process.on("SIGINT", () => process.exit(0));

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email endpoint: http://localhost:${PORT}/api/send-email`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
});
