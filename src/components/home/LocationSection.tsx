import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { instituteInfo } from "@/lib/data";

const LocationSection = () => {
  return (
    <section className="py-14">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Find Us
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Visit Our <span className="text-gradient-primary">Campus</span>
          </h2>
          <p className="text-muted-foreground">
            Come visit us and experience our world-class learning environment firsthand.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="card-hover">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Our Address</h3>
                  <p className="text-sm text-muted-foreground">{instituteInfo.address}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <a
                    href={`tel:${instituteInfo.phone}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {instituteInfo.phone}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <a
                    href={`mailto:${instituteInfo.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {instituteInfo.email}
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Working Hours</h3>
                  <p className="text-sm text-muted-foreground">{instituteInfo.workingHours}</p>
                </div>
              </CardContent>
            </Card>

            <a
              href={instituteInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="hero" className="w-full">
                <Instagram className="w-5 h-5" />
                Follow us on Instagram
              </Button>
            </a>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg border border-border h-[500px]"
          >
            <iframe
              src={instituteInfo.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="IQ Education Hub Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default LocationSection;