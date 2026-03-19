import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { instituteInfo } from "@/lib/data";
import { toast } from "sonner";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: instituteInfo.phone,
    href: `tel:${instituteInfo.phone}`,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Mail,
    label: "Email",
    value: instituteInfo.email,
    href: `mailto:${instituteInfo.email}`,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: MapPin,
    label: "Address",
    value: instituteInfo.address,
    href: "#",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Clock,
    label: "Hours",
    value: instituteInfo.workingHours,
    href: "#",
    color: "text-warning",
    bg: "bg-warning/10",
  },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }
    // Simulate submission
    setSubmitted(true);
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="py-14 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Contact Us
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Get In{" "}
            <span className="text-gradient-primary">Touch With Us</span>
          </h2>
          <p className="text-muted-foreground">
            Have a question about courses, admissions, or visa guidance? Drop us
            a message and we'll respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          {/* Left – contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl font-bold">
              Contact Information
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Visit us at our institute in Dera Bassi, connect via phone or
              email, or use the form to send us a message anytime.
            </p>

            <div className="space-y-4">
              {contactDetails.map(({ icon: Icon, label, value, href, color, bg }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors group"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                      {label}
                    </div>
                    <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right – form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
              <h3 className="font-heading text-xl font-bold mb-6">
                Send a Message
              </h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-success" />
                  <h4 className="font-heading font-bold text-xl">
                    Message Sent!
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Thanks for reaching out. We'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-sm font-medium text-foreground"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Gurpreet Singh"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-sm font-medium text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your query or how we can help you..."
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
                    />
                  </div>

                  <Button
                    id="contact-submit"
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
