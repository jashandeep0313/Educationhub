import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { achievements } from "@/lib/data";

const videoTestimonials = achievements.filter((a) => a.type === "video");

// Fallback thumbnails if local images don't load
const fallbackThumbs = [
  "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?w=600&h=340&fit=crop",
  "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?w=600&h=340&fit=crop",
];

const VideoTestimonialsSection = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-14 bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <Badge
            variant="secondary"
            className="mb-4 bg-background/10 text-background border-background/20"
          >
            Video Testimonials
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Hear From Our{" "}
            <span className="text-gradient-accent">Success Stories</span>
          </h2>
          <p className="text-background/70 leading-relaxed">
            Real students, real results. Watch their journeys from aspiration to
            achievement with IQ Education Hub.
          </p>
        </motion.div>

        {/* Video grid */}
        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {videoTestimonials.map((video, index) => {
            const thumb = video.thumbnail || fallbackThumbs[index % fallbackThumbs.length];
            const isHovered = hoveredId === video.id;

            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredId(video.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setActiveVideo(video.videoUrl || null)}
              >
                {/* Thumbnail card */}
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-foreground/50 shadow-2xl ring-1 ring-background/10 group-hover:ring-accent/50 transition-all duration-300">
                  <img
                    src={thumb}
                    alt={video.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isHovered ? "scale-105" : "scale-100"
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        fallbackThumbs[index % fallbackThumbs.length];
                    }}
                  />

                  {/* Dark overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 ${
                      isHovered ? "opacity-90" : "opacity-60"
                    }`}
                  />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: isHovered ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative"
                    >
                      {/* Pulse ring */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0.6, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.8 }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-accent"
                        />
                      )}
                      <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/40">
                        <Play className="w-7 h-7 text-white fill-white ml-1" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Bottom meta */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Video className="w-3.5 h-3.5 text-accent" />
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                        Student Story
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-lg text-white leading-tight">
                      {video.title}
                    </h3>
                    <p className="text-white/70 text-sm mt-1 line-clamp-1">
                      {video.description}
                    </p>
                  </div>
                </div>

                {/* Watch on Instagram link */}
                <div className="mt-3 flex items-center gap-1.5 text-background/50 hover:text-accent transition-colors text-sm">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Watch on Instagram</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative background elements */}
        <div className="absolute left-0 top-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors group"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
                <iframe
                  src={`${activeVideo}embed`}
                  title="Video Testimonial"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <p className="text-center text-white/50 text-sm mt-4">
                Click outside or press Escape to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoTestimonialsSection;
