import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Logo from "./Logo";
import { sendEmail } from "../services/emailService";

const GetStartedPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    role: "",
    challenges: "",
    timeline: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateCurrentStep = () => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
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
    } else if (currentStep === 3) {
      // Selected Service validation (challenges field)
      if (!formData.challenges.trim()) {
        newErrors.challenges =
          "Please describe your IT goals or select a service";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Onboarding form submission started with data:", {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        hasChallenges: !!formData.challenges,
      });

      // Send email via EmailJS
      const emailData = {
        to: "nxtgenhub15@gmail.com",
        subject: `New Client Onboarding Request from ${formData.name}`,
        body: `
          Full Name: ${formData.name}
          Email Address: ${formData.email}
          Company: ${formData.company || "Not provided"}
          Role: ${formData.role || "Not provided"}
          IT Goals/Challenges: ${formData.challenges}
          Timeline: ${formData.timeline || "Not specified"}
        `,
        formType: "onboarding" as const,
        formData,
      };

      console.log("Calling sendEmail function for onboarding...");
      const emailSent = await sendEmail(emailData);
      console.log("Onboarding email send result:", emailSent);

      if (emailSent) {
        console.log("✅ Onboarding form submitted successfully!");
        setIsCompleted(true);
        // Auto redirect after 4 seconds
        setTimeout(() => {
          navigate(-1);
        }, 4000);
      } else {
        console.error("❌ Onboarding email sending returned false");
        // Handle email sending failure with more specific error
        setErrors({
          submit:
            "Unable to submit your form at this time. Please try again in a few moments, or contact us directly at nxtgenhub15@gmail.com",
        });
      }
    } catch (error: any) {
      console.error("❌ Onboarding form submission error:", {
        message: error.message,
        stack: error.stack,
        fullError: error,
      });
      setErrors({
        submit: `An error occurred while submitting your form: ${error.message || "Unknown error"}. Please contact us directly at nxtgenhub15@gmail.com`,
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
        fromPage: "get-started",
      },
    });
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="mb-6">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <Logo size="large" className="mx-auto mb-4" />
          </div>
          <h2 className="text-2xl font-bold text-black mb-4">
            Welcome to NxtgenHub!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for getting started with us. We'll be in touch within 24
            hours to discuss your IT needs and next steps.
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-black mb-2">
                Let's get started!
              </h2>
              <p className="text-gray-600">
                First, we'll need your contact information.
              </p>
            </div>

            <div className="space-y-4">
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
                  placeholder="your.email@company.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
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
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-black mb-2">
                Tell us about your organization
              </h2>
              <p className="text-gray-600">
                This helps us understand your context better.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="Your Company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">Select your role</option>
                  <option value="ceo">CEO/Founder</option>
                  <option value="cto">CTO</option>
                  <option value="it-manager">IT Manager</option>
                  <option value="operations">Operations Manager</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-black mb-2">
                What are your IT goals?
              </h2>
              <p className="text-gray-600">
                Help us understand how we can best assist you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="challenges">
                  Selected Service / IT Goals *
                </Label>
                <Textarea
                  id="challenges"
                  name="challenges"
                  required
                  value={formData.challenges}
                  onChange={handleInputChange}
                  className={`w-full min-h-[100px] ${errors.challenges ? "border-red-500" : ""}`}
                  placeholder="Describe your main IT challenges or what you're looking to achieve..."
                />
                {errors.challenges && (
                  <p className="text-red-500 text-sm">{errors.challenges}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">Timeline</Label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="">When do you need this addressed?</option>
                  <option value="asap">ASAP</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="3-months">Within 3 months</option>
                  <option value="6-months">Within 6 months</option>
                  <option value="planning">Just planning ahead</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

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

      {/* Progress Bar */}
      <div className="fixed top-16 sm:top-20 left-0 right-0 bg-white border-b z-40">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep} of 3
            </span>
            <span className="text-sm text-gray-600">
              {Math.round((currentStep / 3) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 sm:pt-40 pb-16 px-4 sm:px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderStep()}
          </motion.div>

          {/* Error Message */}
          {errors.submit && (
            <div className="text-center mt-4">
              <p className="text-red-500 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Previous
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                className="bg-black text-white hover:bg-black/90 flex items-center gap-2"
              >
                Next
                <ArrowRight size={16} />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-black text-white hover:bg-black/90 flex items-center gap-2 min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Sending via SMTP...
                  </>
                ) : (
                  <>
                    Complete
                    <CheckCircle size={16} />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetStartedPage;
