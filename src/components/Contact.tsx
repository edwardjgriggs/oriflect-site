"use client";

import { useState, FormEvent } from "react";
import { useReveal } from "@/lib/useReveal";

export default function Contact() {
  const revealRef = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (formData: FormData) => {
    const errs: Record<string, string> = {};
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name?.trim()) errs.name = "Name is required";
    if (!email?.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Please enter a valid email";
    if (!message?.trim()) errs.message = "Message is required";

    return errs;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div ref={revealRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <p className="text-gold font-semibold text-sm tracking-widest uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sapphire-900 mb-4">
            Let&apos;s Start the{" "}
            <span className="gradient-text">Conversation</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left — benefits */}
          <div className="reveal reveal-delay-1">
            <h3 className="text-2xl font-bold text-sapphire-900 mb-6">
              What to Expect
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: "Free 30-Minute Discovery Call",
                  desc: "No cost, no obligation. Just a focused conversation about your business and how AI might help.",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  title: "Custom AI Roadmap",
                  desc: "Walk away with a clear plan for where AI can make the biggest impact in your specific business.",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  ),
                },
                {
                  title: "No Pressure, No Obligation",
                  desc: "We earn your trust through clarity and results — not sales tactics. If we are not the right fit, we will tell you.",
                  icon: (
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 12c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-2.125-.553-4.12-1.382-5.938z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  ),
                },
              ].map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sapphire-900/5 text-sapphire-900 flex items-center justify-center shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sapphire-900 mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-charcoal/60 text-sm leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal reveal-delay-2">
            {submitted ? (
              <div className="bg-ivory rounded-2xl p-10 text-center shadow-md">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-gold"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-sapphire-900 mb-3">
                  Message Received!
                </h3>
                <p className="text-charcoal/60 leading-relaxed">
                  Thank you for reaching out. We will review your message and
                  get back to you within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-ivory rounded-2xl p-8 shadow-md space-y-5"
                noValidate
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-sapphire-900 mb-1.5"
                  >
                    Name <span className="text-ember">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name ? "border-ember" : "border-charcoal/10"
                    } bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="text-ember text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-sapphire-900 mb-1.5"
                  >
                    Email <span className="text-ember">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? "border-ember" : "border-charcoal/10"
                    } bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all`}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p className="text-ember text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-sapphire-900 mb-1.5"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-charcoal/10 bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-sapphire-900 mb-1.5"
                  >
                    Message <span className="text-ember">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message ? "border-ember" : "border-charcoal/10"
                    } bg-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all resize-none`}
                    placeholder="Tell us about your business and what you're looking for..."
                  />
                  {errors.message && (
                    <p className="text-ember text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-ember hover:bg-ember-dark text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-ember/25"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
