import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import Logo from "./Logo";
import { sendEmail } from "../services/emailService";

const TalkToExpertPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Full Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Company validation
    if (!formData.company.trim()) {
      newErrors.company = "Company or Team Name is required";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Please describe your challenges";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Form submission started with data:", {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        hasMessage: !!formData.message,
      });

      // Send email via EmailJS
      const emailData = {
        to: "nxtgenhub15@gmail.com",
        subject: `New DevOps Expert Consultation Request from ${formData.name}`,
        body: `
          Full Name: ${formData.name}
          Email Address: ${formData.email}
          Company or Team Name: ${formData.company}
          Phone Number: ${formData.phone || "Not provided"}
          What challenges are you facing?: ${formData.message}
        `,
        formType: "expert" as const,
        formData,
      };

      console.log("Calling sendEmail function...");
      const emailSent = await sendEmail(emailData);
      console.log("Email send result:", emailSent);

      if (emailSent) {
        console.log("✅ Form submitted successfully!");
        setIsSubmitted(true);
        // Auto redirect after 4 seconds
        setTimeout(() => {
          navigate(-1);
        }, 4000);
      } else {
        console.error("❌ Email sending returned false");
        // Handle email sending failure with more specific error
        setErrors({
          submit:
            "Unable to send your message at this time. Please try again in a few moments, or contact us directly at nxtgenhub15@gmail.com",
        });
      }
    } catch (error: any) {
      console.error("❌ Form submission error:", {
        message: error.message,
        stack: error.stack,
        fullError: error,
      });
      setErrors({
        submit: `An error occurred while sending your message: ${error.message || "Unknown error"}. Please contact us directly at nxtgenhub15@gmail.com`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    // Navigate back to homepage with smooth back transition
    navigate("/", {
      state: {
        isBackNavigation: true,
        fromPage: "talk-to-expert",
      },
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="mb-6">
            <Logo size="large" className="mx-auto mb-4" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Thank you! Someone from our DevOps team will be in touch with you
            shortly.
          </p>
          <Button
            onClick={handleBack}
            className="bg-black text-white hover:bg-black/90"
          >
            Return to Homepage
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 sm:h-20 bg-white flex items-center justify-between px-4 sm:px-8 md:px-16 z-50 shadow-sm">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
        <div className="flex items-center">
          <Logo className="mr-2 sm:mr-3 h-8 w-8 sm:h-10 sm:w-10" />
          <span className="text-lg sm:text-xl font-bold text-black">
            NxtgenHub
          </span>
        </div>
        <div className="w-16"></div> {/* Spacer for centering */}
      </header>

      {/* Main Content */}
      <main className="pt-24 sm:pt-32 pb-16 px-4 sm:px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Talk to an Expert
            </h1>
            <p className="text-lg text-gray-600">
              Tell us about your IT challenges and goals. Our experts will
              provide personalized recommendations.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full ${errors.name ? "border-red-500" : ""}`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full ${errors.email ? "border-red-500" : ""}`}
                  placeholder="john@company.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company">Company or Team Name *</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleInputChange}
                  className={`w-full ${errors.company ? "border-red-500" : ""}`}
                  placeholder="Your Company"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm">{errors.company}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">What challenges are you facing? *</Label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full min-h-[120px] ${errors.message ? "border-red-500" : ""}`}
                placeholder="Describe your IT challenges, goals, or specific areas where you need expert guidance..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            {errors.submit && (
              <div className="text-center">
                <p className="text-red-500 text-sm">{errors.submit}</p>
              </div>
            )}

            <div className="flex justify-center pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white hover:bg-black/90 px-8 py-3 rounded-full flex items-center gap-2 min-w-[160px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending via SMTP...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8 text-sm text-gray-500"
          >
            <p>We typically respond within 24 hours during business days.</p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default TalkToExpertPage;
