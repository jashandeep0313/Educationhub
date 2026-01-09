import { Link } from "react-router-dom";
import { GraduationCap, Phone, Mail, MapPin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { instituteInfo } from "@/lib/data";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl">{instituteInfo.name}</h2>
                <p className="text-sm text-background/60">{instituteInfo.tagline}</p>
              </div>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              {instituteInfo.license}
              <br />
              Empowering students to achieve their dreams through quality education and expert guidance.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={instituteInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center hover:bg-destructive transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "About Us", "Courses", "Blog", "Contact Us"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-background/70 hover:text-accent transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Courses */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Our Courses</h3>
            <ul className="space-y-3">
              {[
                "IELTS/PTE Preparation",
                "Study Visa Guidance",
                "Spoken English",
                "8th to 12th Classes",
              ].map((course) => (
                <li key={course}>
                  <Link
                    to="/courses"
                    className="text-background/70 hover:text-accent transition-colors"
                  >
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <span className="text-background/70 text-sm">{instituteInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href={`tel:${instituteInfo.phone}`}
                  className="text-background/70 hover:text-accent transition-colors text-sm"
                >
                  {instituteInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a
                  href={`mailto:${instituteInfo.email}`}
                  className="text-background/70 hover:text-accent transition-colors text-sm"
                >
                  {instituteInfo.email}
                </a>
              </li>
            </ul>
            <p className="text-background/50 text-sm mt-4">{instituteInfo.workingHours}</p>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} {instituteInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-background/50">
            <Link to="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;