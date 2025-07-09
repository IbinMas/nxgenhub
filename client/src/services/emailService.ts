// Email service for handling form submissions via backend API
interface EmailData {
  to: string;
  subject: string;
  body: string;
  formType: "expert" | "onboarding";
  formData: any;
}

interface EmailResponse {
  success: boolean;
  error?: string;
  confirmationSent?: boolean;
}

// Backend server URL - configurable for different environments
const getBackendUrl = () => {
  // Use environment variable with fallback to the full backend API URL
  return import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api';
};

export const sendEmail = async (emailData: EmailData): Promise<boolean> => {
  console.log("Sending email via backend API...", {
    formType: emailData.formType,
    hasFormData: !!emailData.formData,
  });

  try {
    // Prepare email payload for backend API
    const emailPayload = {
      subject: emailData.subject,
      html: formatEmailBodyHTML(emailData),
      text: formatEmailBody(emailData),
      replyTo: emailData.formData.email,
      formType: emailData.formType,
      formData: emailData.formData,
      // Include user confirmation email data
      sendConfirmation: !!(
        emailData.formData.email && isValidEmail(emailData.formData.email)
      ),
      confirmationEmail:
        emailData.formData.email && isValidEmail(emailData.formData.email)
          ? {
              to: emailData.formData.email,
              subject: getConfirmationSubject(emailData.formType),
              html: formatConfirmationEmailHTML(emailData),
              text: formatConfirmationEmailText(emailData),
            }
          : null,
    };

    // Send to backend API endpoint
    const backendUrl = getBackendUrl();
    console.log("Using backend URL:", `${backendUrl}/send-email`);

    const response = await fetch(`${backendUrl}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    const responseData = await response.json();
    console.log("Backend API response:", responseData);

    if (response.ok && responseData.success) {
      console.log("✅ Email sent successfully");
      if (responseData.confirmationSent) {
        console.log("✅ Confirmation email sent to user");
      }
      return true;
    } else {
      console.error(
        "❌ Email sending failed:",
        responseData.error || "Unknown error",
      );
      return false;
    }
  } catch (error: any) {
    console.error("❌ Backend API failed:", {
      message: error.message,
      stack: error.stack,
    });
    return false;
  }
};

const formatEmailBody = (emailData: EmailData): string => {
  const { formType, formData } = emailData;

  if (formType === "expert") {
    return `
NEW DEVOPS EXPERT CONSULTATION REQUEST
=====================================

Contact Information:
- Full Name: ${formData.name}
- Email Address: ${formData.email}
- Company: ${formData.company}
- Phone Number: ${formData.phone || "Not provided"}

Challenges & Requirements:
${formData.message}

📧 Sent via NxtgenHub Contact Form
    `;
  } else {
    return `
NEW CLIENT ONBOARDING REQUEST
============================

Contact Information:
- Full Name: ${formData.name}
- Email Address: ${formData.email}
- Company: ${formData.company || "Not provided"}
- Role: ${formData.role || "Not provided"}

Service Requirements:
- IT Goals/Challenges: ${formData.challenges}
- Timeline: ${formData.timeline || "Not specified"}

🚀 Sent via NxtgenHub Get Started Form
    `;
  }
};

const formatEmailBodyHTML = (emailData: EmailData): string => {
  const { formType, formData } = emailData;

  if (formType === "expert") {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; border-bottom: 3px solid #000; padding-bottom: 10px;">🔧 NEW DEVOPS EXPERT CONSULTATION REQUEST</h2>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 15px;">📋 Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Full Name:</td><td style="padding: 8px 0;">${formData.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${formData.email}">${formData.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td style="padding: 8px 0;">${formData.company}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${formData.phone || "Not provided"}</td></tr>
          </table>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 15px;">💬 Challenges & Requirements</h3>
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 4px solid #000;">
            ${formData.message.replace(/\n/g, "<br>")}
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px;">
          📧 Sent via NxtgenHub Contact Form
        </div>
      </div>
    </div>
    `;
  } else {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; border-bottom: 3px solid #000; padding-bottom: 10px;">🚀 NEW CLIENT ONBOARDING REQUEST</h2>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 15px;">📋 Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Full Name:</td><td style="padding: 8px 0;">${formData.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${formData.email}">${formData.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td style="padding: 8px 0;">${formData.company || "Not provided"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Role:</td><td style="padding: 8px 0;">${formData.role || "Not provided"}</td></tr>
          </table>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #555; margin-bottom: 15px;">🎯 Service Requirements</h3>
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 4px solid #000;">
            <p><strong>IT Goals/Challenges:</strong><br>${formData.challenges.replace(/\n/g, "<br>")}</p>
            <p><strong>Timeline:</strong> ${formData.timeline || "Not specified"}</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 14px;">
          🚀 Sent via NxtgenHub Get Started Form
        </div>
      </div>
    </div>
    `;
  }
};

// Helper function to validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Get confirmation email subject based on form type
const getConfirmationSubject = (formType: "expert" | "onboarding"): string => {
  if (formType === "expert") {
    return "Thank you for contacting NxtgenHub - We'll be in touch soon!";
  } else {
    return "Welcome to NxtgenHub - Your onboarding request received!";
  }
};

// Format confirmation email text version
const formatConfirmationEmailText = (emailData: EmailData): string => {
  const { formType, formData } = emailData;

  if (formType === "expert") {
    return `
Hi ${formData.name},

Thank you for reaching out to NxtgenHub!

We've received your DevOps consultation request and our expert team will review your requirements. Someone from our team will be in touch with you within 24 hours during business days.

Your request details:
- Company: ${formData.company}
- Phone: ${formData.phone || "Not provided"}
- Challenges: ${formData.message}

In the meantime, feel free to explore our blog for the latest insights on DevOps best practices and cloud solutions.

Best regards,
The NxtgenHub Team

---
NxtgenHub - Simplify IT. Empower Growth
Email: nxtgenhub15@gmail.com
Website: https://nxtgenhub.com
    `;
  } else {
    return `
Hi ${formData.name},

Welcome to NxtgenHub!

Thank you for starting your journey with us. We've received your onboarding request and are excited to help you achieve your IT goals.

Your request details:
- Company: ${formData.company || "Not provided"}
- Role: ${formData.role || "Not provided"}
- IT Goals: ${formData.challenges}
- Timeline: ${formData.timeline || "Not specified"}

Our team will review your requirements and contact you within 24 hours to discuss the next steps and how we can best support your business transformation.

Best regards,
The NxtgenHub Team

---
NxtgenHub - Simplify IT. Empower Growth
Email: nxtgenhub15@gmail.com
Website: https://nxtgenhub.com
    `;
  }
};

// Format confirmation email HTML version
const formatConfirmationEmailHTML = (emailData: EmailData): string => {
  const { formType, formData } = emailData;

  if (formType === "expert") {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin-bottom: 10px;">Thank You, ${formData.name}!</h1>
          <div style="width: 60px; height: 4px; background-color: #000; margin: 0 auto;"></div>
        </div>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Thank you for reaching out to <strong>NxtgenHub</strong>! We've received your DevOps consultation request and our expert team will review your requirements.
        </p>
        
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; border-left: 4px solid #000; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">⏰ What's Next?</h3>
          <p style="color: #555; margin-bottom: 0;">Someone from our team will be in touch with you within <strong>24 hours</strong> during business days to discuss your specific needs and how we can help.</p>
        </div>
        
        <div style="margin: 25px 0;">
          <h3 style="color: #333; margin-bottom: 15px;">📋 Your Request Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0; color: #333;">${formData.company}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone:</td><td style="padding: 8px 0; color: #333;">${formData.phone || "Not provided"}</td></tr>
          </table>
          <div style="margin-top: 15px;">
            <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Challenges:</p>
            <div style="background-color: #f0f0f0; padding: 12px; border-radius: 4px; color: #333;">
              ${formData.message.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #555; margin-bottom: 15px;">In the meantime, explore our latest insights:</p>
          <a href="https://nxtgenhub.com/blog" style="display: inline-block; background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">Visit Our Blog</a>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
          <p style="margin-bottom: 5px;"><strong>NxtgenHub</strong> - Simplify IT. Empower Growth</p>
          <p style="margin-bottom: 0;">📧 <a href="mailto:nxtgenhub15@gmail.com" style="color: #666;">nxtgenhub15@gmail.com</a> | 🌐 <a href="https://nxtgenhub.com" style="color: #666;">nxtgenhub.com</a></p>
        </div>
      </div>
    </div>
    `;
  } else {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin-bottom: 10px;">Welcome to NxtgenHub, ${formData.name}!</h1>
          <div style="width: 60px; height: 4px; background-color: #000; margin: 0 auto;"></div>
        </div>
        
        <p style="color: #555; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
          Thank you for starting your journey with <strong>NxtgenHub</strong>! We've received your onboarding request and are excited to help you achieve your IT goals.
        </p>
        
        <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; border-left: 4px solid #000; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">🚀 What's Next?</h3>
          <p style="color: #555; margin-bottom: 0;">Our team will review your requirements and contact you within <strong>24 hours</strong> to discuss the next steps and how we can best support your business transformation.</p>
        </div>
        
        <div style="margin: 25px 0;">
          <h3 style="color: #333; margin-bottom: 15px;">📋 Your Onboarding Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Company:</td><td style="padding: 8px 0; color: #333;">${formData.company || "Not provided"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Role:</td><td style="padding: 8px 0; color: #333;">${formData.role || "Not provided"}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Timeline:</td><td style="padding: 8px 0; color: #333;">${formData.timeline || "Not specified"}</td></tr>
          </table>
          <div style="margin-top: 15px;">
            <p style="font-weight: bold; color: #555; margin-bottom: 8px;">IT Goals & Challenges:</p>
            <div style="background-color: #f0f0f0; padding: 12px; border-radius: 4px; color: #333;">
              ${formData.challenges.replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #555; margin-bottom: 15px;">Explore our services while you wait:</p>
          <a href="https://nxtgenhub.com/services" style="display: inline-block; background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">View Our Services</a>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center; color: #666; font-size: 14px;">
          <p style="margin-bottom: 5px;"><strong>NxtgenHub</strong> - Simplify IT. Empower Growth</p>
          <p style="margin-bottom: 0;">📧 <a href="mailto:nxtgenhub15@gmail.com" style="color: #666;">nxtgenhub15@gmail.com</a> | 🌐 <a href="https://nxtgenhub.com" style="color: #666;">nxtgenhub.com</a></p>
        </div>
      </div>
    </div>
    `;
  }
};

export default { sendEmail };
