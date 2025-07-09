// Backend API endpoint for sending emails via SMTP
// This would typically be in a separate backend service

import nodemailer from "nodemailer";

interface EmailRequest {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
  replyTo: string;
  smtpConfig: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  };
}

export const sendEmailSMTP = async (
  emailData: EmailRequest,
): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log("Creating SMTP transporter with config:", {
      host: emailData.smtpConfig.host,
      port: emailData.smtpConfig.port,
      secure: emailData.smtpConfig.secure,
      user: emailData.smtpConfig.auth.user,
    });

    // Create transporter using Brevo SMTP
    const transporter = nodemailer.createTransport({
      host: emailData.smtpConfig.host,
      port: emailData.smtpConfig.port,
      secure: emailData.smtpConfig.secure,
      auth: {
        user: emailData.smtpConfig.auth.user,
        pass: emailData.smtpConfig.auth.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    // Send email
    const info = await transporter.sendMail({
      from: emailData.from,
      to: emailData.to,
      subject: emailData.subject,
      text: emailData.text,
      html: emailData.html,
      replyTo: emailData.replyTo,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return { success: true };
  } catch (error: any) {
    console.error("❌ SMTP sending failed:", error.message);
    return { success: false, error: error.message };
  }
};
