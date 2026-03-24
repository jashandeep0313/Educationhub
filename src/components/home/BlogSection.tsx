import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import { Link } from "react-router-dom";

interface BlogSectionProps {
  /** When true, only the first 3 posts are shown (home-page preview mode). */
  preview?: boolean;
}

const categoryColor: Record<string, string> = {
  IELTS: "bg-primary/10 text-primary",
  Visa: "bg-accent/10 text-accent",
  English: "bg-success/10 text-success",
  Academic: "bg-warning/10 text-warning",
};

const BlogSection = ({ preview = false }: BlogSectionProps) => {
  const { blogs } = useData();
  const posts = preview ? blogs.slice(0, 3) : blogs;

  return (
    <section id="blog" className="py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Our Blog
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Insights &amp;{" "}
            <span className="text-gradient-primary">Expert Advice</span>
          </h2>
          <p className="text-muted-foreground">
            Tips, guides, and success stories to help you on your education and
            immigration journey.
          </p>
        </motion.div>

        {/* Card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full card-hover overflow-hidden flex flex-col">
                {/* Thumbnail */}
                {post.image && post.image.trim() !== "" && (
                  <div className="relative w-full h-[200px] overflow-hidden bg-muted shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-center transition-all duration-500 hover:scale-105 opacity-0"
                      onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm backdrop-blur-md ${
                          categoryColor[post.category] ??
                          "bg-secondary/90 text-secondary-foreground"
                        }`}
                      >
                        {post.category}
                      </span>
                      {post.achievement && (
                        <span className="bg-warning text-warning-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md backdrop-blur-md">
                          <Award className="w-3 h-3" /> Achievement
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <CardContent className={`p-5 flex flex-col gap-3 flex-1 ${(!post.image || post.image.trim() === "") ? 'pt-6' : ''}`}>
                  {/* Badges for No Image */}
                  {(!post.image || post.image.trim() === "") && (
                    <div className="flex gap-2">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          categoryColor[post.category] ??
                          "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        {post.category}
                      </span>
                      {post.achievement && (
                        <span className="bg-warning text-warning-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                          <Award className="w-3 h-3" /> Achievement
                        </span>
                      )}
                    </div>
                  )}
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {post.date}
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-lg leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {post.summary}
                  </p>

                  {/* Read more */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-1 group"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* "View all" CTA — shown only in preview mode */}
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/blog">
              <Button variant="outline" size="lg">
                View All Articles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
