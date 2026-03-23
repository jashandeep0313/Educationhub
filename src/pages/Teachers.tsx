import { motion } from "framer-motion";
import { Users, Award, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/context/DataContext";

const Teachers = () => {
  const { teachers } = useData();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <div className="py-16 bg-muted/30 border-b border-border text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
            Our <span className="text-gradient-primary">Faculty</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto px-4">
            Meet our expert educators and professionals dedicated to guiding you
            towards your academic and career goals.
          </p>
        </div>

        {/* Teachers Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full card-hover overflow-hidden flex flex-col border-border shadow-md">
                    <CardHeader className="p-0">
                      <div className="relative aspect-square bg-muted">
                        <img
                          src={teacher.image}
                          alt={teacher.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge variant="secondary" className="bg-background/80 backdrop-blur-md">
                            {teacher.role}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-5 flex-1 flex flex-col">
                      <h2 className="font-heading font-bold text-xl mb-2">
                        {teacher.name}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {teacher.bio}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-center mb-4">
                        <div className="p-2 rounded-lg bg-muted flex flex-col items-center justify-center">
                          <Award className="w-4 h-4 text-primary mb-1" />
                          <span className="text-xs font-medium">{teacher.experience}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-muted flex flex-col items-center justify-center">
                          <Users className="w-4 h-4 text-primary mb-1" />
                          <span className="text-xs font-medium">{teacher.students}+ Students</span>
                        </div>
                      </div>

                      <div className="space-y-2 mt-auto text-sm text-muted-foreground">
                        {teacher.email && teacher.email !== "N/A" && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            <span className="truncate">{teacher.email}</span>
                          </div>
                        )}
                        {teacher.phone && teacher.phone !== "N/A" && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            <span>{teacher.phone}</span>
                          </div>
                        )}
                        {teacher.address && teacher.address !== "N/A" && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="truncate">{teacher.address}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Teachers;
