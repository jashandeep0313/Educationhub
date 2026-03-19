import { motion } from "framer-motion";
import { Award, Users, BookOpen, Target, Heart, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { instituteInfo, stats } from "@/lib/data";

const pillars = [
  {
    icon: Award,
    title: "Expert Faculty",
    description:
      "Our certified trainers bring 6–15+ years of real-world experience in IELTS, visa consulting, and academics.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Target,
    title: "Proven Results",
    description:
      "With a 95% success rate and 2500+ happy students, our track record speaks for itself year after year.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Lightbulb,
    title: "Modern Methods",
    description:
      "Blended learning with online classes, mock tests, personalised feedback, and up-to-date study material.",
    color: "text-success",
    bg: "bg-success/10",
  },
];

const values = [
  { icon: Heart, label: "Student-Centric" },
  { icon: BookOpen, label: "Quality Education" },
  { icon: Users, label: "Inclusive Community" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            About Us
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Shaping Futures at{" "}
            <span className="text-gradient-primary">{instituteInfo.name}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Founded with a passion for quality education, IQ Education Hub has
            been guiding students towards their dream careers and international
            opportunities since day one.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left – story */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h3 className="font-heading text-2xl font-bold">
              Our Story &amp; Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              IQ Education Hub was born out of a simple belief — every student
              deserves access to world-class coaching regardless of background.
              Nestled near Chandigarh in Dera Bassi, we serve learners from
              across Punjab and beyond, both in-person and online.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether your goal is an IELTS band 8, a Canada study visa, or a
              top board score, our dedicated faculty crafts a personalised path
              for each student. We combine rigorous academics with compassionate
              mentorship to unlock potential that goes far beyond the classroom.
            </p>

            {/* Value badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              {values.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </div>
              ))}
            </div>

            {/* Mini stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-border">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="font-heading text-2xl font-bold text-primary">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right – image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src="https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?w=800&h=600&fit=crop"
                alt="Students learning at IQ Education Hub"
                className="w-full h-full object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 glass rounded-2xl px-5 py-3 shadow-lg">
                <div className="font-heading font-bold text-foreground text-lg">
                  {instituteInfo.license}
                </div>
                <div className="text-sm text-muted-foreground">
                  Government Approved Institute
                </div>
              </div>
            </div>
            {/* Decorative blob */}
            <div className="absolute -top-8 -right-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-accent/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-card rounded-2xl p-8 shadow-sm border border-border hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${pillar.bg} flex items-center justify-center mb-5`}
                >
                  <Icon className={`w-7 h-7 ${pillar.color}`} />
                </div>
                <h4 className="font-heading text-xl font-bold mb-3">
                  {pillar.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
