import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Star, Quote, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
// This links to your 2nd code file
import { achievements } from "@/lib/data"; 

const AchievementsSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videoAchievements = achievements.filter((a) => a.type === "video");
  const reviews = achievements.filter((a) => a.type === "review");

  return (
    <section className="py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Success Stories
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gradient-primary">Achievements</span> & Reviews
          </h2>
          <p className="text-muted-foreground">
            See what our students have achieved and hear their success stories.
          </p>
        </motion.div>

        {/* Video Achievements */}
        <div className="mb-16">
          <h3 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" />
            Video Testimonials
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {videoAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden card-hover">
                  <div
                    className="relative aspect-video bg-muted cursor-pointer group"
                    onClick={() => setActiveVideo(achievement.videoUrl || null)}
                  >
                    <img
                      src={achievement.thumbnail}
                      alt={achievement.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center group-hover:bg-foreground/50 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-accent transform group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-accent-foreground fill-accent-foreground ml-1" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold mb-1">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-warning fill-warning" />
            Student Reviews
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full card-hover">
                  <CardContent className="p-6 space-y-4">
                    <Quote className="w-8 h-8 text-primary/20" />
                    <p className="text-muted-foreground italic">"{review.review}"</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (review.rating || 0)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                        <img
                          src={review.image || "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"}
                          alt={review.student}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{review.student}</div>
                        <div className="text-xs text-muted-foreground">
                          {review.course}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Video Modal */}
        <AnimatePresence>
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setActiveVideo(null)}
            >
              <div
                className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setActiveVideo(null)}
                  className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-black" />
                </button>
                <iframe
                  src={activeVideo.replace("instagram.com/p/", "instagram.com/p/") + "embed"}
                  title="Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AchievementsSection;