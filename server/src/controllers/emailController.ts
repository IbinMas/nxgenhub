import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { createTransporter } from '../utils/emailUtils.js';
import "dotenv"
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

export const sendMailHandler = async (req: Request, res: Response) => {
  console.log("📧 Received email request:", req.path);
  try {
    const emailData = req.body as EmailRequest;

    if (!emailData.subject || (!emailData.html && !emailData.text)) {
      res.status(400).json({ success: false, error: "Missing required fields" });
      return;
    }

    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    const mailOptions = {
      from: process.env.SMTP_FROM as string,
      to: process.env.RECIPIENT_EMAIL,
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
